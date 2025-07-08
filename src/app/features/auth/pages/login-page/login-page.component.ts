import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { TitleDescriptionComponent } from '../../../../shared/components/title-description/title-description.component';

@Component({
  selector: 'app-login-page',
  imports: [TitleDescriptionComponent, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

}
