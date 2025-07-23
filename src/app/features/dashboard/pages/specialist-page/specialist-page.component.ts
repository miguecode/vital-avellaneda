import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { UserInformationCardComponent } from "../../components/user-information-card/user-information-card.component";
import { SplashComponent } from "../../../../shared/components/splash/splash.component";
import { AuthFacade } from '../../../auth/auth.facade';
import { UserBase } from '../../../../core/models';

@Component({
  selector: 'app-specialist-page',
  imports: [UserInformationCardComponent, SplashComponent],
  templateUrl: './specialist-page.component.html',
  styleUrl: './specialist-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistPageComponent {
  private readonly authFacade = inject(AuthFacade);
  readonly user: Signal<UserBase | null> = this.authFacade.user;
  readonly isCheckingAuth: Signal<boolean> = this.authFacade.isCheckingAuth;
}
