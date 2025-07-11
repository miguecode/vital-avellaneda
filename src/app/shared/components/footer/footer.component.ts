import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_SHARED_INFO } from '../../../core/config/app-info';
import { SvgIconComponent } from '../../icons/svg-icon.component';

@Component({
  selector: 'app-footer',
  imports: [SvgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  // Visual info
  readonly email = APP_SHARED_INFO.contact.email;
  readonly phone = APP_SHARED_INFO.contact.phone;
  readonly firstLocation = APP_SHARED_INFO.location.main;
  readonly secondLocation = APP_SHARED_INFO.location.secondary;

  // Href
  readonly facebook = APP_SHARED_INFO.social.facebook;
  readonly instagram = APP_SHARED_INFO.social.instagram;
  readonly twitter = APP_SHARED_INFO.social.twitter;
  readonly tiktok = APP_SHARED_INFO.social.tiktok;
}
