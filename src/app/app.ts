import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { filter } from 'rxjs';

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

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        this.navigationService.setCurrentUrl(currentUrl);

        /*
        console.log(
          'NavigationService - Current:',
          this.navigationService.currentUrl()
        );
        console.log(
          'NavigationService - Previous:',
          this.navigationService.previousUrl()
        );*/
      });
  }
}
