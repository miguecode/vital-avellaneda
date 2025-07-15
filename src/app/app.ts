import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFacade } from './features/auth/auth.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'vital-avellaneda';
  authFacade = inject(AuthFacade);

  constructor() {
    this.authFacade.checkAuthStatus();
  }
}
