import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {

}
