import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _currentUrl = signal<string | null>(null);
  private _previousUrl = signal<string | null>(null);
  private _manageFromList = signal<boolean>(false);

  readonly currentUrl = this._currentUrl.asReadonly();
  readonly previousUrl = this._previousUrl.asReadonly();
  readonly manageFromList = this._manageFromList.asReadonly();

  setCurrentUrl(newUrl: string) {
    if (newUrl === '/home') {
      this._previousUrl.set('/home');
    } else {
      this._previousUrl.set(this._currentUrl());
    }

    this._currentUrl.set(newUrl);
  }

  setManageFromList(value: boolean) {
    this._manageFromList.set(value);
  }
}
