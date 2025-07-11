import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InformationCardComponent } from '../information-card/information-card.component';
import {
  EmailIconComponent,
  PhoneIconComponent,
  LocationIconComponent,
} from '../../../../shared/icons';
import { APP_SHARED_INFO } from '../../../../core/config/app-info';

@Component({
  selector: 'app-information-wrapper',
  imports: [
    InformationCardComponent,
    EmailIconComponent,
    PhoneIconComponent,
    LocationIconComponent,
  ],
  templateUrl: './information-wrapper.component.html',
  styleUrl: './information-wrapper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationWrapperComponent {
  readonly email = APP_SHARED_INFO.contact.email;
  readonly phone = APP_SHARED_INFO.contact.phone;
  readonly location = APP_SHARED_INFO.location.main;
}