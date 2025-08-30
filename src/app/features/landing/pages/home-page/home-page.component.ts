import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { InformationWrapperComponent } from '../../components/information-wrapper/information-wrapper.component';
import { PresentationWrapperComponent } from '../../components/presentation-wrapper/presentation-wrapper.component';
import { RecommendationsComponent } from '../../components/recommendations/recommendations.component';
import { NewsPreviewListComponent } from '../../../news/components/news-preview-list/news-preview-list.component';
import { SeoService } from '../../../../shared/services/seo/seo.service';
import { SeoData } from '../../../../core/models/seo-data.model';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroSectionComponent,
    InformationWrapperComponent,
    PresentationWrapperComponent,
    PresentationWrapperComponent,
    RecommendationsComponent,
    NewsPreviewListComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  seoService = inject(SeoService);

  constructor() {
    effect(() => {
      const homeMeta: SeoData = {
        title: 'Vital Avellaneda | Inicio',
        description: 'Clínica Vital Avellaneda, centro médico integral con turnos online. Ofrecemos atención en cardiología, pediatría, dermatología y más. Cuidamos tu salud con profesionales de primer nivel.',
        keywords: ['clínica médica', 'turnos online', 'salud', 'médicos', 'especialistas', 'Avellaneda', 'cardiología', 'pediatría', 'dermatología', 'diagnóstico', 'Vital Avellaneda'],
        author: 'Vital Avellaneda',
        image: 'https://res.cloudinary.com/dsd1komi4/image/upload/v1756509770/logo-big_jsy8qr.jpg',
      };
      this.seoService.setMeta(homeMeta);
    });
  }
}

