import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderDashboardComponent } from '../../shared/components/header-dashboard/header-dashboard.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SplashComponent } from '../../shared/components/splash/splash.component';
import { DialogService } from '../../shared/services/dialog/dialog.service';

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
  readonly showSplash = signal(true);
  readonly  dialogService = inject(DialogService);

  constructor() {
    console.log('Dashboard Layout Started');
    setTimeout(() => this.showSplash.set(false), 500);
  }
}