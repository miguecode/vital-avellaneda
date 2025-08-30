import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { FastLoginCardComponent } from "../../components/fast-login-card/fast-login-card.component";
import { SeoService } from '../../../../shared/services/seo/seo.service';
import { SeoData } from '../../../../core/models/seo-data.model';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, FastLoginCardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  seoService = inject(SeoService);

  constructor() {
    effect(() => {
      const loginMeta: SeoData = {
        title: 'Iniciar Sesión | Vital Avellaneda',
        description: 'Accedé a tu cuenta para gestionar tus turnos, ver tu historial médico y comunicarte con nuestros especialistas. Tu salud, a un clic de distancia.',
        keywords: ['iniciar sesión', 'portal paciente', 'turnos médicos', 'historial clínico', 'salud online'],
        author: 'Vital Avellaneda',
        image: 'https://res.cloudinary.com/dsd1komi4/image/upload/v1756509770/logo-big_jsy8qr.jpg',
      };
      this.seoService.setMeta(loginMeta);
    });
  }
}