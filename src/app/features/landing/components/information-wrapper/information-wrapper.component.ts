import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InformationCardComponent } from '../information-card/information-card.component';
import {
  EmailIconComponent,
  PhoneIconComponent,
  LocationIconComponent,
} from '../../../../icons';

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
