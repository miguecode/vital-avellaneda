import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { RouterModule } from '@angular/router';
import { InformationWrapperComponent } from "../../../landing/components/information-wrapper/information-wrapper.component";

@Component({
  selector: 'app-info-help-page',
  imports: [SvgIconComponent, RouterModule, InformationWrapperComponent],
  templateUrl: './info-help-page.component.html',
  styleUrl: './info-help-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoHelpPageComponent {
  faqItems = [
    {
      question: '¿Cómo solicito un nuevo turno?',
      answer:
        'Para solicitar un nuevo turno, iniciá sesión como Paciente para acceder al Portal, y hacé clic en el botón "Solicitar Turno". Luego, seleccioná la especialidad, el profesional que prefieras y elegí el día y horario que más te convenga. ¡Así de fácil!',
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
}
