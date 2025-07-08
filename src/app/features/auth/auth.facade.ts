import { Injectable, computed, inject, signal } from '@angular/core';
import { AUTH_REPOSITORY } from '../../core/interfaces/auth.repository.token';
import { UserBase } from '../../core/models';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // Simple but not 100% Clean Architecture
  // private authService: AuthRepository = inject(FirebaseAuthService);

  // Using the AUTH_REPOSITORY token to inject the AuthRepository implementation
  private authService = inject(AUTH_REPOSITORY);

  // Reactive state with signals
  private _user = signal<UserBase | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public signals to interact with the auth service
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isLoading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /*
   * Checks if the user is authenticated and updates the state.
   * @param email - User's email
   * @param password - User's password
   * @returns Promise<void>
   */
  async checkAuthStatus(): Promise<void> {
    this._loading.set(true);

    try {
      const isAuthenticated = await this.authService.isAuthenticated();

      if (isAuthenticated) {
        const currentUser = await this.authService.getCurrentUser();
        this._user.set(currentUser);
      } else {
        this._user.set(null);
      }
    } catch (error: any) {
      this._user.set(null);
      this._error.set(error.message || 'Error checking authentication status');
    } finally {
      this._loading.set(false);
    }
  }

  /*
   * Logs the user with the provided credentials and updates the state.
   * @param email - User's email
   * @param password - User's password
   * @returns Promise<void>
   */
  async login(email: string, password: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      await this.authService.login(email, password);
      const user = await this.authService.getCurrentUser();
      this._user.set(user);
    } catch (error: any) {
      const errorMessage = this.getLoginErrorMessage(error);
      this._error.set(errorMessage || 'Error del servidor. Intenta más tarde.');
      this._user.set(null);
    } finally {
      this._loading.set(false);
    }
  }

  /*
   * Registers a new user with the provided credentials and updates the state.
   * @param email - User's email
   * @param password - User's password
   * @returns Promise<void>
   */
  async register(email: string, password: string): Promise<void | string> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const uid = await this.authService.register(email, password);
      const user = await this.authService.getCurrentUser();
      this._user.set(user);
      return uid;
    } catch (error: any) {
      this._error.set(error.message || 'Registration failed');
    } finally {
      this._loading.set(false);
    }
  }

  /*
   * Logs out the current user and updates the state.
   * @returns Promise<void>
   */
  async logout(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      await this.authService.logout();
      this._user.set(null);
    } catch (error: any) {
      this._error.set(error.message || 'Logout failed');
    } finally {
      this._loading.set(false);
    }
  }

  /*
  * Maps authentication error codes to user-friendly error messages.
  * @param error - The error object containing the error code.
  * @returns A user-friendly error message based on the error code.
  */
  private getLoginErrorMessage(error: any): string {
    const code = error?.code;
  
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos.';
  
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde.';
  
      case 'auth/invalid-email':
        return 'Correo electrónico inválido.';
  
      default:
        return 'Error al iniciar sesión. Intenta nuevamente.';
    }
  }
}