import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { InformationWrapperComponent } from '../../components/information-wrapper/information-wrapper.component';
import { PresentationWrapperComponent } from "../../components/presentation-wrapper/presentation-wrapper.component";
import { AuthFacade } from '../../../auth/auth.facade';

@Component({
  selector: 'app-home-page',
  imports: [HeroSectionComponent, InformationWrapperComponent, PresentationWrapperComponent, PresentationWrapperComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly authFacade = inject(AuthFacade);

  constructor() {
    // console.log('Home Page Started');
    // console.log('HOME PAGE: Checking Status: ', this.authFacade.isCheckingAuth());


  }
}
