import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { RouterModule } from '@angular/router';
import { InformationWrapperComponent } from "../../../landing/components/information-wrapper/information-wrapper.component";
import { SeoService } from '../../../../shared/services/seo/seo.service';
import { SeoData } from '../../../../core/models/seo-data.model';

@Component({
  selector: 'app-info-help-page',
  imports: [SvgIconComponent, RouterModule, InformationWrapperComponent],
  templateUrl: './info-help-page.component.html',
  styleUrl: './info-help-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoHelpPageComponent {
  seoService = inject(SeoService);

  constructor() {
    effect(() => {
      const helpMeta: SeoData = {
        title: 'Centro de Ayuda | Vital Avellaneda',
        description: '¿Tenés dudas sobre cómo usar nuestro portal? Encontrá respuestas a las preguntas más comunes sobre turnos, historia clínica y más. Estamos para ayudarte.',
        keywords: ['preguntas frecuentes', 'ayuda', 'soporte', 'turnos online', 'portal del paciente'],
        author: 'Vital Avellaneda',
        image: 'https://res.cloudinary.com/dsd1komi4/image/upload/v1756509770/logo-big_jsy8qr.jpg',
      };
      this.seoService.setMeta(helpMeta);
    });
  }

  openFaqItem: number | null = null;

  faqItems = [
    {
      question: '¿Cómo solicito un nuevo turno?',
      answer:
        'Primero, iniciá sesión como Paciente para acceder al Portal, y hacé clic en "Solicitar Nuevo Turno". Luego, seleccioná la especialidad, el profesional que prefieras y elegí el día y horario que más te convenga. ¡Así de fácil!',
    },
    {
      question: '¿Puedo ver mi historial de turnos?',
      answer:
        '¡Claro! En la sección "Mis Turnos", encontrarás un listado completo de todos tus turnos pasados y futuros. Podrás ver detalles como la fecha, el especialista y el estado de cada uno.',
    },
    {
      question: '¿Cómo gestiono un turno?',
      answer:
        'Para cancelar o verificar el estado y la información de un turno, ingresá al portal y hacé clic en "Mis Turnos", buscá tu turno y listo. Allí tendrás las opciones para cancelarlo, calificarlo o ver el diagnóstico escrito por el especialista.',
    },
    {
      question: '¿Cómo accedo a mi historia clínica?',
      answer:
        'Tu historia clínica es confidencial y solo puede ser accedida por vos y los profesionales autorizados. Podés consultar un resumen de tus últimas consultas en la sección "Mi Perfil" o solicitar una copia completa en la recepción de la clínica.',
    },
  ];

  toggleFaqItem(index: number) {
    this.openFaqItem = this.openFaqItem === index ? null : index;
  }
}