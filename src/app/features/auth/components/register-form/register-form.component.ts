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
import {
  UserRoles as R,
  UserStatus,
  HealthInsurances,
  Sex,
  BloodTypes,
} from '../../../../core/enums';
import {
  BLOOD_TYPE_LABELS,
  SEX_LABELS,
  HEALTH_INSURANCE_LABELS,
} from '../../../../core/enums/enum-labels';

import { InputCustomComponent } from '../input-custom/input-custom.component';
import { SelectCustomComponent } from '../select-custom/select-custom.component';
import { SpecialtySelectorComponent } from "../specialty-selector/specialty-selector.component";
import { AvailabilitySelectorComponent } from "../availability-selector/availability-selector.component";
import { Availability, Specialty } from '../../../../core/models';

// User mode to toggle forms
type UserMode = R.PATIENT | R.SPECIALIST;

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputCustomComponent,
    SelectCustomComponent,
    SpecialtySelectorComponent,
    AvailabilitySelectorComponent
],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full w-full' },
})
export class RegisterFormComponent {
  // Options and Labels for enums properties
  readonly bloodTypeOptions = Object.values(BloodTypes);
  readonly sexOptions = Object.values(Sex);
  readonly healthInsuranceOptions = Object.values(HealthInsurances);
  readonly bloodTypeLabels = BLOOD_TYPE_LABELS;
  readonly sexLabels = SEX_LABELS;
  readonly healthInsuranceLabels = HEALTH_INSURANCE_LABELS;

  // Signal for Current mode (Patient or Specialist)
  readonly userMode: WritableSignal<UserMode> = signal<UserMode>(R.PATIENT);

  // Signal to known if the current mode is specialist or not
  readonly isSpecialist: Signal<boolean> = computed(
    () => this.userMode() === R.SPECIALIST
  );

  // Main Form
  readonly form: FormGroup;

  // Create form
  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // User base properties
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: [''],

      // Patient properties
      healthInsurance: [''],
      bloodType: ['', Validators.required],
      height: [''],
      weight: [''],

      // Specialist properties
      specialties: [[]],
      availability: [[]],
    });
  }

  // If the user mode is Patient, change to Specialist, and vice versa
  toggleMode(): void {
    if (this.showSpecialtyModal() || this.showAvailabilityModal()) this.closeModals();
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

  // Specialty and Availability Modals
  readonly showSpecialtyModal: WritableSignal<boolean> = signal(false);
  readonly showAvailabilityModal: WritableSignal<boolean> = signal(false);

  // Open Modal
  openModal(modalToShow: WritableSignal<boolean>): void {
    modalToShow.set(true);
  }

  // Close both Modals
  closeModals(): void {
    this.showSpecialtyModal.set(false);
    this.showAvailabilityModal.set(false);
  }

  onSpecialtiesSelected(specialties: Specialty[]): void {
    this.form.get('specialties')?.setValue(specialties);
    this.closeModals();
  }
  
  onAvailabilitySelected(availability: Availability[]): void {
    this.form.get('availability')?.setValue(availability);
    this.closeModals();
  }
}