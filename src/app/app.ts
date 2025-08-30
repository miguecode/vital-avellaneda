import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { filter } from 'rxjs';
import { AuthFacade } from './features/auth/auth.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'vital-avellaneda';

  // Navigation control
  private router = inject(Router);
  private navigationService = inject(NavigationService);
  private authFacade = inject(AuthFacade);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        this.navigationService.setCurrentUrl(currentUrl);
      });

    // Check auth status on app startup
    this.authFacade.checkAuthStatus();
  }
}