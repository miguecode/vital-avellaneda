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
  authFacade = inject(AuthFacade);


  constructor() {
    console.log('Auth Layout Started');
    setTimeout(() => this.showSplash.set(false), 500);
  }
}
