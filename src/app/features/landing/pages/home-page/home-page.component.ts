import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { InformationWrapperComponent } from '../../components/information-wrapper/information-wrapper.component';
import { PresentationWrapperComponent } from '../../components/presentation-wrapper/presentation-wrapper.component';
import { RecommendationsComponent } from '../../components/recommendations/recommendations.component';
import { NewsPreviewListComponent } from '../../../news/components/news-preview-list/news-preview-list.component';

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
  constructor() {}
}

