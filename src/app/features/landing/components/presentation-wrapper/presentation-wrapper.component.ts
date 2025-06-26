import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-presentation-wrapper',
  imports: [],
  templateUrl: './presentation-wrapper.component.html',
  styleUrl: './presentation-wrapper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationWrapperComponent {
  srcImage: string = 'images/presentation.webp';
  altImage: string = 'Foto de la Clínica por fuera';
  sectionText: string = 'Presentación';
  titleFirstLine: string = 'Vital Avellaneda';
  titleSecondLine: string = 'Clínica Online';
  description: string =
    'Vital Avellaneda es una clínica digital y presencial pensada para acercar la salud a toda la comunidad de Avellaneda y alrededores, con atención personalizada, turnos simples y un equipo médico comprometido con el bienestar de cada paciente.';
  listItems: string[] = [
    'Ingresos rápidos para probar el funcionamiento',
    'Turnos online, sin demoras ni trámites',
    'Atención 100% digital desde Avellaneda',
  ];
  anchorText: string = 'Conoce más';
  anchorHref: string = '';
}
