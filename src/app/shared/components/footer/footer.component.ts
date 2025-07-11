import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_SHARED_INFO } from '../../../core/config/app-info';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly email = APP_SHARED_INFO.contact.email;
  readonly phone = APP_SHARED_INFO.contact.phone;
  readonly firstLocation = APP_SHARED_INFO.location.main;
  readonly secondLocation = APP_SHARED_INFO.location.secondary;
}
