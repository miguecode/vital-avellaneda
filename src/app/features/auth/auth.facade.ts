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

  // 📌 Reactive state with signals
  private _user = signal<UserBase | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // 📌 Public signals to interact with the auth service  
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isLoading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  async checkAuthStatus(): Promise<void> {
    this._loading.set(true);

    try {
      const isAuthenticated = await this.authService.isAuthenticated();

      if (isAuthenticated) {
        const currentUser = await this.authService.getCurrentUser();
        this._user.set(currentUser);
        this._error.set(null);
      } else {
        this._user.set(null);
        this._error.set('User is not authenticated');
      }
    } catch (error) {
      this._user.set(null);
      this._error.set('Error checking authentication status');
    } finally {
      this._loading.set(false);
    }
  }
}