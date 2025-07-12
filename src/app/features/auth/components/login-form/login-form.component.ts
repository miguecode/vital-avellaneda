import { ChangeDetectionStrategy, Component, inject, Signal, computed, effect } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { InputCustomComponent } from '../input-custom/input-custom.component';
import { NgStyle } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../auth.facade';

@Component({
  selector: 'app-login-form',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    InputCustomComponent,
    NgStyle,
    SvgIconComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  srcImage: string = 'images/login.webp';
  submitted = false;

  private readonly authFacade = inject(AuthFacade);
  readonly loginError: Signal<string | null> = this.authFacade.error;
  readonly isLoading: Signal<boolean> = this.authFacade.isLoading;

  // Computed for disable the form during the load
  readonly isFormDisabled = computed(() => this.isLoading());

  // Main Form
  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
    
    // Effect to enable/disable form controls
    effect(() => {
      if (this.isFormDisabled()) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Submit action
  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    await this.authFacade.login(email, password);
  }
}
