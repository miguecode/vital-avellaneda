import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';

interface Recommendation {
  quote: string;
  author: string;
}

@Component({
  selector: 'app-recommendations',
  imports: [SvgIconComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent {
  recommendations: Recommendation[] = [
    {
      quote:
        'Más del 95% de los pacientes que se internaron en las Clínicas de Vital Avellaneda durante 2025 están muy satisfechos con la experiencia.',
      author: 'Carlos Guzmán, paciente',
    },
    {
      quote:
        'La atención médica en Vital Avellaneda es excepcional. Los profesionales son muy dedicados y el seguimiento es constante.',
      author: 'Ana Torres, paciente',
    },
    // {
    //   quote: 'Gracias a Vital Avellaneda, pude acceder a un especialista rápidamente y mi tratamiento fue un éxito. ¡Totalmente recomendable!',
    //   author: 'Roberto Pérez, paciente'
    // },
    // {
    //   quote: 'La plataforma online es muy intuitiva y facilita mucho la gestión de turnos y el acceso a mi historial médico.',
    //   author: 'Laura García, paciente'
    // },
    // {
    //   quote: 'Como profesional, trabajar con Vital Avellaneda me permite organizar mi agenda de forma eficiente y brindar una atención de calidad.',
    //   author: 'Dr. Martín Sosa, especialista'
    // },
    // {
    //   quote: 'La clínica ofrece un ambiente cálido y seguro, lo que hace que cada visita sea una experiencia positiva.',
    //   author: 'Sofía Castro, paciente'
    // },
  ];
}
