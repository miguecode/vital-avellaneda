import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InformationCardComponent } from '../information-card/information-card.component';
import { EmailIconComponent } from '../../../../icons/email-icon.component';
import { PhoneIconComponent } from '../../../../icons/phone-icon.component';
import { LocationIconComponent } from '../../../../icons/location-icon.component';

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
export class InformationWrapperComponent {}
