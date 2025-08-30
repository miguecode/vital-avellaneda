import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { SeoService } from '../../../../shared/services/seo/seo.service';
import { SeoData } from '../../../../core/models/seo-data.model';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  seoService = inject(SeoService);

  constructor() {
    effect(() => {
      const registerMeta: SeoData = {
        title: 'Registro | Vital Avellaneda',
        description: 'Creá tu cuenta en Vital Avellaneda y empezá a gestionar tu salud de forma online. Solicitá turnos, accedé a tu historial y más. ¡Es rápido y fácil!',
        keywords: ['registro paciente', 'crear cuenta', 'turnos online', 'gestión de salud', 'clínica médica'],
        author: 'Vital Avellaneda',
        image: 'https://res.cloudinary.com/dsd1komi4/image/upload/v1756509770/logo-big_jsy8qr.jpg',
      };
      this.seoService.setMeta(registerMeta);
    });
  }
}
