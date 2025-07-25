import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { AuthFacade } from '../../../auth/auth.facade';
import { UserBase } from '../../../../core/models';
import { SplashComponent } from "../../../../shared/components/splash/splash.component";
import { UserInformationCardComponent } from "../../components/user-information-card/user-information-card.component";
import { AppointmentsPendingComponent } from "../../components/appointments-pending/appointments-pending.component";
import { AppointmentsFinishedComponent } from "../../components/appointments-finished/appointments-finished.component";

@Component({
  selector: 'app-patient-page',
  imports: [SplashComponent, UserInformationCardComponent, AppointmentsPendingComponent, AppointmentsFinishedComponent],
  templateUrl: './patient-page.component.html',
  styleUrl: './patient-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientPageComponent {
  private readonly authFacade = inject(AuthFacade);
  readonly user: Signal<UserBase | null> = this.authFacade.user;
  readonly isCheckingAuth: Signal<boolean> = this.authFacade.isCheckingAuth;
}