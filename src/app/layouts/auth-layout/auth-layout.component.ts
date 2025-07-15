import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAuthComponent } from '../../shared/components/header-auth/header-auth.component';
import { FooterAuthComponent } from '../../shared/components/footer-auth/footer-auth.component';
import { SplashComponent } from '../../shared/components/splash/splash.component';
import { AuthFacade } from '../../features/auth/auth.facade';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    SplashComponent,
    HeaderAuthComponent,
    FooterAuthComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  showSplash = signal(true);
  private authFacade = inject(AuthFacade);
  private navigationService = inject(NavigationService);

  constructor() {
    console.log('Auth Layout Started');

    // If the previous URL is Home, not show Splash
    const previousUrl = this.navigationService.previousUrl();
    const redirectedFromHome = previousUrl === '/home';
    if (redirectedFromHome && !this.authFacade.isCheckingAuth()) {
      this.showSplash.set(false);
    } else {
      setTimeout(() => this.showSplash.set(false), 500);
    }
  }
}
