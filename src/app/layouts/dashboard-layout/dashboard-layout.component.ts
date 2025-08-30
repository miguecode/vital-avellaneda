import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderDashboardComponent } from '../../shared/components/header-dashboard/header-dashboard.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SplashComponent } from '../../shared/components/splash/splash.component';
import { DialogService } from '../../shared/services/dialog/dialog.service';
import { SeoService } from '../../shared/services/seo/seo.service';
import { SeoData } from '../../core/models/seo-data.model';

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
  readonly dialogService = inject(DialogService);
  private seoService = inject(SeoService);

  constructor() {
    console.log('Dashboard Layout Started');
    setTimeout(() => this.showSplash.set(false), 500);

    effect(() => {
      const dashboardMeta: SeoData = {
        title: 'Portal | Vital Avellaneda',
        description: 'Gestioná tus turnos, revisá tu historial médico y accedé a todos nuestros servicios online.',
        author: 'Vital Avellaneda',
        keywords: ['portal paciente', 'portal especialista', 'solicitar turno', 'mis turnos', 'historia clínica', 'salud online'],
        image: 'https://res.cloudinary.com/dsd1komi4/image/upload/v1756509770/logo-big_jsy8qr.jpg',
      };
      this.seoService.setMeta(dashboardMeta);
    });
  }
}
