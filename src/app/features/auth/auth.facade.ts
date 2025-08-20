import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_REPOSITORY } from '../../core/interfaces/auth.repository.token';
import { UserBase } from '../../core/models';
import { UserRoles } from '../../core/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // Simple but not 100% Clean Architecture
  // private authService: AuthRepository = inject(FirebaseAuthService);

  // Using the AUTH_REPOSITORY token to inject the AuthRepository implementation
  private authService = inject(AUTH_REPOSITORY);
  private router = inject(Router);

  // Reactive state with signals
  private _user = signal<UserBase | null>(null);
  private _loading = signal<boolean>(false);
  private _checkingAuth = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public signals to interact with the auth service
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isLoading = this._loading.asReadonly();
  readonly isCheckingAuth = this._checkingAuth.asReadonly();
  readonly error = this._error.asReadonly();

  /*
   * Allows manually setting the user publicly (for example, after registration)
   * @param user - The user to set in the signal
   */
  setUser(user: UserBase | null): void {
    this._user.set(user);
  }

  /*
   * Checks if the user is authenticated and updates the state.
   * @param email - User's email
   * @param password - User's password
   * @returns Promise<void>
   */
  async checkAuthStatus(): Promise<void> {
    this._checkingAuth.set(true);
    console.log('Check Auth Status Started');

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
      this._checkingAuth.set(false);
      this.consoleInform();
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

      // Redirect user to appropriate dashboard based on role
      if (user) {
        this.redirectUserByRole(user);
      }
    } catch (error: any) {
      const errorMessage = this.getLoginErrorMessage(error);
      this._error.set(errorMessage || 'Error del servidor. Intenta más tarde.');
      this._user.set(null);
    } finally {
      this._loading.set(false);
      this.consoleInform();
    }
  }

  /*
   * Registers a new user with the provided credentials
   * @param email - User's email
   * @param password - User's password
   * @returns Promise<void>
   */
  async register(email: string, password: string): Promise<string | void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const uid = await this.authService.register(email, password);
      return uid;
    } catch (error: any) {
      const errorMessage = this.getRegisterErrorMessage(error);
      this._error.set(errorMessage || 'Error del servidor. Intenta más tarde.');
    } finally {
      this._loading.set(false);
      this.consoleInform();
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
      this.consoleInform();
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

  /*
   * Maps registration error codes to user-friendly error messages.
   * @param error - The error object containing the error code.
   * @returns A user-friendly error message based on the error code.
   */
  private getRegisterErrorMessage(error: any): string {
    const code = error?.code;

    switch (code) {
      case 'auth/email-already-in-use':
        return 'Ese correo ya está registrado.';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil. Usá una más segura.';
      default:
        return 'No se pudo crear la cuenta. Intenta más tarde.';
    }
  }

  /*
   * Redirects the user to the appropriate dashboard based on their role.
   * @param user - The authenticated user object.
   */
  redirectUserByRole(user: UserBase): void {
    switch (user.role) {
      case UserRoles.PATIENT:
        this.router.navigate(['/dashboard/patient']);
        break;
      case UserRoles.SPECIALIST:
        this.router.navigate(['/dashboard/specialist']);
        break;
      case UserRoles.ADMIN:
        this.router.navigate(['/dashboard/specialist']);
        break;
      default:
        // Default fallback
        console.warn('Unknown user role:', user.role);
        this.router.navigate(['/dashboard/patient']);
        break;
    }
  }

  /*
   * Inform in console the authentication state
   */
  private consoleInform(): void {
    const info = { isAuthenticated: this.isAuthenticated(), userSignal: this.user() }
    console.log(info);
  }
}
