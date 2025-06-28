import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

import { UserRoles as R, UserStatus } from '../../../../core/enums';
import { InputCustomComponent } from '../input-custom/input-custom.component';
import { SelectCustomComponent } from '../select-custom/select-custom.component';

// User mode to toggle forms
type UserMode = R.PATIENT | R.SPECIALIST;

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputCustomComponent,
    SelectCustomComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full w-full' },
})
export class RegisterFormComponent {
  // Current mode (Patient or Specialist)
  readonly userMode: WritableSignal<UserMode> = signal<UserMode>(R.PATIENT);

  // Boolean signal
  readonly isSpecialist: Signal<boolean> = computed(
    () => this.userMode() === R.SPECIALIST
  );

  // Main Form
  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // User base properties
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      phone: [''],
      profilePictureId: [''],
      password: ['', Validators.required],

      // Patient properties
      healthInsurance: [''],
      bloodType: [''],
      height: [''],
      weight: [''],

      // Specialist properties
      specialty: [[]],
      availability: [[]],
    });
  }

  // If the user mode is Patient, change to Specialist, and vice versa
  toggleMode(): void {
    const newMode = this.userMode() === R.PATIENT ? R.SPECIALIST : R.PATIENT;
    this.userMode.set(newMode);
  }

  // Submit action
  onSubmit(): void {
    if (this.form.invalid) return;

    const formData = this.form.value;

    const data = this.isSpecialist()
      ? {
          ...formData,
          rol: R.SPECIALIST,
          registrationDate: new Date(),
          status: UserStatus.ACTIVE,
        }
      : {
          ...formData,
          rol: R.PATIENT,
          registrationDate: new Date(),
          status: UserStatus.ACTIVE,
        };

    console.log('Registrando usuario:', data);
  }
}
