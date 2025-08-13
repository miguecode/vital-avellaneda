import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';

interface Recommendation {
  quote: string;
  author: string;
}

@Component({
  selector: 'app-recommendations',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent implements OnInit, OnDestroy {
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
    {
      quote:
        'Gracias a Vital Avellaneda, pude acceder a un especialista rápidamente y mi tratamiento fue un éxito. ¡Totalmente recomendable!',
      author: 'Roberto Pérez, paciente',
    },
    {
      quote:
        'La plataforma online es muy intuitiva y facilita mucho la gestión de turnos y el acceso a mi historial médico.',
      author: 'Laura García, paciente',
    },
    {
      quote:
        'Como profesional, trabajar con Vital Avellaneda me permite organizar mi agenda de forma eficiente y brindar una atención de calidad.',
      author: 'Dr. Martín Sosa, especialista',
    },
    {
      quote:
        'La clínica ofrece un ambiente cálido y seguro, lo que hace que cada visita sea una experiencia positiva.',
      author: 'Sofía Castro, paciente',
    },
  ];

  displayedRecommendations = signal<Recommendation[]>([]);
  animationState = signal<'in' | 'out'>('in');
  private currentIndex = 0;
  private intervalId?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.updateDisplayedRecommendations();
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = window.setInterval(() => {
        this.animationState.set('out');

        setTimeout(() => {
          this.updateDisplayedRecommendations();
          this.animationState.set('in');
        }, 400);
      }, 6000);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  }

  private updateDisplayedRecommendations(): void {
    const recs = this.recommendations;
    const count = recs.length;

    this.displayedRecommendations.set([
      recs[this.currentIndex],
      recs[(this.currentIndex + 1) % count],
    ]);

    // Move index for the next pair
    this.currentIndex = (this.currentIndex + 2) % count;
  }
}
