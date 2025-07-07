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
import { Specialty } from '../../../../core/models';
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
import {
  AVAILABILITY_PRESETS,
  AVAILABILITY_PRESETS_LABELS,
  AVAILABILITY_PRESETS_OPTIONS,
} from '../../../../core/constants/availability-presets';

import { InputCustomComponent } from '../input-custom/input-custom.component';
import { SelectCustomComponent } from '../select-custom/select-custom.component';
import { SpecialtySelectorComponent } from '../specialty-selector/specialty-selector.component';
import { CustomValidators } from '../../../../core/validators/custom-validators';

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

  // Options and Labels for availability presets
  readonly availabilityPresets = AVAILABILITY_PRESETS;
  readonly availabilityOptions = AVAILABILITY_PRESETS_OPTIONS;
  readonly availabilityLabels = AVAILABILITY_PRESETS_LABELS;

  // Signal for Current mode (Patient or Specialist)
  readonly userMode: WritableSignal<UserMode> = signal<UserMode>(R.PATIENT);

  // Signal to known if the current mode is specialist or not
  readonly isSpecialist: Signal<boolean> = computed(
    () => this.userMode() === R.SPECIALIST
  );

  // Birth date limits
  readonly minBirthDate: string = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  )
    .toISOString()
    .split('T')[0];
  readonly maxBirthDate: string = new Date(
    new Date().setFullYear(new Date().getFullYear() - 150)
  )
    .toISOString()
    .split('T')[0];

  // Main Form
  readonly form: FormGroup;

  // Create form
  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
    this.updateModeValidators();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // User base properties
      firstName: ['', [Validators.required, CustomValidators.name(2, 30)]],
      lastName: ['', [Validators.required, CustomValidators.name(2, 30)]],
      dni: ['', [Validators.required, CustomValidators.dni(7, 9)]],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.password(8, 50)]],
      birthDate: ['', [Validators.required, CustomValidators.age(18, 150)]],
      phone: ['', CustomValidators.phoneOptional(8, 15)],

      // Patient properties
      healthInsurance: ['', Validators.required],
      bloodType: ['', Validators.required],
      height: ['', [Validators.min(100), Validators.max(250)]],
      weight: ['', [Validators.min(30), Validators.max(250)]],

      // Specialist properties
      specialties: [[], [Validators.required, Validators.minLength(1)]],
      availability: [[], Validators.required],
    });
  }

  // Update the validators of the fields of the current mode
  private updateModeValidators(): void {
    // Patient fields
    const healthInsurance = this.form.get('healthInsurance');
    const bloodType = this.form.get('bloodType');
    const height = this.form.get('height');
    const weight = this.form.get('weight');
    // Specialist fields
    const specialties = this.form.get('specialties');
    const availability = this.form.get('availability');

    if (this.isSpecialist()) {
      // Specialist: required
      specialties?.setValidators([
        Validators.required,
        Validators.minLength(1),
      ]);
      availability?.setValidators([Validators.required]);
      // Patient: not required
      healthInsurance?.clearValidators();
      bloodType?.clearValidators();
      height?.clearValidators();
      weight?.clearValidators();
    } else {
      // Patient: required
      healthInsurance?.setValidators([Validators.required]);
      bloodType?.setValidators([Validators.required]);
      height?.setValidators([Validators.min(100), Validators.max(250)]);
      weight?.setValidators([Validators.min(30), Validators.max(250)]);
      // Specialist: not required
      specialties?.clearValidators();
      availability?.clearValidators();
    }
    // Update validation state
    healthInsurance?.updateValueAndValidity();
    bloodType?.updateValueAndValidity();
    height?.updateValueAndValidity();
    weight?.updateValueAndValidity();
    specialties?.updateValueAndValidity();
    availability?.updateValueAndValidity();
  }

  // Clear the fields of the previous mode
  private clearModeFields(): void {
    if (this.isSpecialist()) {
      // Clear patient fields
      this.form.get('healthInsurance')?.reset('');
      this.form.get('bloodType')?.reset('');
      this.form.get('height')?.reset('');
      this.form.get('weight')?.reset('');
    } else {
      // Clear specialist fields
      this.form.get('specialties')?.reset([]);
      this.form.get('availability')?.reset([]);
    }
  }

  // If the user mode is Patient, change to Specialist, and vice versa
  toggleMode(): void {
    if (this.showSpecialtyModal()) this.closeModal();
    const newMode = this.userMode() === R.PATIENT ? R.SPECIALIST : R.PATIENT;
    this.userMode.set(newMode);
    this.clearModeFields();
    this.updateModeValidators();
  }

  // Submit action
  onSubmit(): void {
    if (this.form.invalid) return;

    const formData = this.form.value;
    let submitData = {};

    if (this.isSpecialist()) {
      // Clean data for specialist: remove patient fields
      submitData = {
        ...this.getSpecialistData(formData),
        rol: R.SPECIALIST,
        registrationDate: new Date(),
        status: UserStatus.ACTIVE,
      };
    } else {
      // Clean data for patient: remove specialist fields
      submitData = {
        ...this.getPatientData(formData),
        rol: R.PATIENT,
        registrationDate: new Date(),
        status: UserStatus.ACTIVE,
      };
    }

    console.log('Registrando usuario:', submitData);
  }

  // Get only the relevant data for a specialist
  private getSpecialistData(formData: any): any {
    const {
      // Base fields (common to both types)
      firstName,
      lastName,
      dni,
      sex,
      email,
      password,
      birthDate,
      phone,
      // Specialist fields
      specialties,
      availability,
      // Patient fields (not included in the return)
      healthInsurance,
      bloodType,
      height,
      weight,
      ...rest
    } = formData;

    return {
      firstName,
      lastName,
      dni,
      sex,
      email,
      password,
      birthDate,
      phone,
      specialties,
      availability,
      // Other fields (not patient)
      ...rest,
    };
  }

  // Get only the relevant data for a patient
  private getPatientData(formData: any): any {
    const {
      // Base fields (common to both types)
      firstName,
      lastName,
      dni,
      sex,
      email,
      password,
      birthDate,
      phone,
      // Patient fields
      healthInsurance,
      bloodType,
      height,
      weight,
      // Specialist fields (not included in the return)
      specialties,
      availability,
      ...rest
    } = formData;

    return {
      firstName,
      lastName,
      dni,
      sex,
      email,
      password,
      birthDate,
      phone,
      healthInsurance,
      bloodType,
      height,
      weight,
      // Other fields (not specialist)
      ...rest,
    };
  }

  // Specialty Modal
  readonly showSpecialtyModal: WritableSignal<boolean> = signal(false);

  // Open Modal
  openSpecialtyModal(): void {
    this.showSpecialtyModal.set(true);
  }

  // Close Modal
  closeModal(): void {
    this.showSpecialtyModal.set(false);
  }

  // Get selected specialties
  onSpecialtiesSelected(specialties: Specialty[]): void {
    this.form.get('specialties')?.setValue([...specialties]);
    this.closeModal();
  }
}
