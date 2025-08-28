import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_SHARED_INFO } from '../../../core/config/app-info';

@Component({
  selector: 'app-footer-auth',
  imports: [RouterLink],
  templateUrl: './footer-auth.component.html',
  styleUrl: './footer-auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterAuthComponent {
  readonly github = APP_SHARED_INFO.social.github;
}