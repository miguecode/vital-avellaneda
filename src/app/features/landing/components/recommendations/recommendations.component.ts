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
        'Más del <strong>95% de los pacientes</strong> que se internaron en las Clínicas de Vital Avellaneda durante 2025 están <strong>muy satisfechos</strong> con la experiencia.',
      author: 'Carlos Guzmán, paciente',
    },
    {
      quote:
        'La atención médica en Vital Avellaneda es <strong>excepcional</strong>. Los profesionales son <strong>muy dedicados</strong> y el seguimiento es constante.',
      author: 'Ana Torres, paciente',
    },
    {
      quote:
        'Gracias a Vital Avellaneda, pude acceder a un especialista <strong>rápidamente</strong> y mi tratamiento fue un <strong>éxito</strong>. ¡Totalmente recomendable!',
      author: 'Roberto Pérez, paciente',
    },
    {
      quote:
        'La plataforma online es <strong>muy intuitiva</strong> y facilita mucho la gestión de turnos y el acceso a mi historial médico.',
      author: 'Laura García, paciente',
    },
    {
      quote:
        'Como profesional, trabajar con Vital Avellaneda me permite organizar mi agenda de <strong>forma eficiente</strong> y brindar una <strong>atención de calidad</strong>.',
      author: 'Dr. Martín Sosa, especialista',
    },
    {
      quote:
        'La clínica ofrece un ambiente <strong>cálido y seguro</strong>, lo que hace que cada visita sea una <strong>experiencia positiva</strong>.',
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
