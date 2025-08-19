import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { TitleDescriptionComponent } from '../../../../shared/components/title-description/title-description.component';
import { AuthFacade } from '../../../auth/auth.facade';
import { SplashComponent } from '../../../../shared/components/splash/splash.component';
import { PatientsTableComponent } from '../../../patients/components/patients-table/patients-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-list-page',
  imports: [
    SvgIconComponent,
    TitleDescriptionComponent,
    SplashComponent,
    PatientsTableComponent,
    RouterLink
  ],
  templateUrl: './patient-list-page.component.html',
  styleUrl: './patient-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListPageComponent {
  readonly authFacade = inject(AuthFacade);
}
