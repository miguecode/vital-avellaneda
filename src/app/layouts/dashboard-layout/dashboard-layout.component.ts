import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderDashboardComponent } from '../../shared/components/header-dashboard/header-dashboard.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SplashComponent } from '../../shared/components/splash/splash.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    SplashComponent,
    HeaderDashboardComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  showSplash = signal(true);

  constructor() {
    console.log('Dashboard Layout Started');
    setTimeout(() => this.showSplash.set(false), 500);
  }
}
