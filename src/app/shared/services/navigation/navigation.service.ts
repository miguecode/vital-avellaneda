import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _currentUrl = signal<string | null>(null);
  private _previousUrl = signal<string | null>(null);

  readonly currentUrl = this._currentUrl.asReadonly();
  readonly previousUrl = this._previousUrl.asReadonly();

  /**
   * Sets the current URL and updates the previous one.
   * If entering /home directly, forces previousUrl to /home
   */
  setCurrentUrl(newUrl: string) {
    if (newUrl === '/home') {
      this._previousUrl.set('/home');
    } else {
      this._previousUrl.set(this._currentUrl());
    }

    this._currentUrl.set(newUrl);
  }
}
