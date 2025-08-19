import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { FastLoginCardComponent } from "../../components/fast-login-card/fast-login-card.component";

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, FastLoginCardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

}
