import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainCarouselComponent } from '../main-carousel/main-carousel.component';
import { PanelSelectorComponent } from "../panel-selector/panel-selector.component";

@Component({
  selector: 'app-hero-section',
  imports: [RouterModule, MainCarouselComponent, PanelSelectorComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {}
