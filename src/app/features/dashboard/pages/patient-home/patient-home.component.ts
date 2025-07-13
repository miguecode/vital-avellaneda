import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { AuthFacade } from '../../../auth/auth.facade';
import { UserBase } from '../../../../core/models';

@Component({
  selector: 'app-patient-home',
  imports: [],
  templateUrl: './patient-home.component.html',
  styleUrl: './patient-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientHomeComponent {
  private readonly authFacade = inject(AuthFacade);
  readonly user: Signal<UserBase | null> = this.authFacade.user;
  readonly isCheckingAuth: Signal<boolean> = this.authFacade.isCheckingAuth;
}


