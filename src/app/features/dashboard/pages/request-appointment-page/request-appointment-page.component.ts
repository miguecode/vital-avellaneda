import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { SplashComponent } from '../../../../shared/components/splash/splash.component';
import { AuthFacade } from '../../../auth/auth.facade';
import { UserBase } from '../../../../core/models';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { TitleDescriptionComponent } from "../../../../shared/components/title-description/title-description.component";
import { RequestAppointmentFormComponent } from "../../../appointments/components/request-appointment-form/request-appointment-form.component";

@Component({
  selector: 'app-request-appointment-page',
  imports: [SplashComponent, RouterLink, SvgIconComponent, TitleDescriptionComponent, RequestAppointmentFormComponent],
  templateUrl: './request-appointment-page.component.html',
  styleUrl: './request-appointment-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestAppointmentPageComponent {
  private readonly authFacade = inject(AuthFacade);
  readonly user: Signal<UserBase | null> = this.authFacade.user;
  readonly isCheckingAuth: Signal<boolean> = this.authFacade.isCheckingAuth;
}
