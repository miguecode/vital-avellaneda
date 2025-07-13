import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
  effect,
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
import { AuthFacade } from '../../auth.facade';
import { UserFacade } from '../../user.facade';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { RouterLink } from '@angular/router';

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
    SvgIconComponent,
    RouterLink
],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full w-full' },
})
export class RegisterFormComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly userFacade = inject(UserFacade);

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

  // Birth date limits
  readonly maxBirthDate: string;
  readonly minBirthDate: string;

  // Signal for Current mode (Patient or Specialist)
  readonly userMode: WritableSignal<UserMode> = signal<UserMode>(R.PATIENT);

  // Show errors - combines both facades
  submitted = false;
  get registerError(): string | null {
    return this.userFacade.error() || this.authFacade.error();
  }

  // Loading state - combines both facades
  readonly isLoading: Signal<boolean> = computed(() => 
    this.authFacade.isLoading() || this.userFacade.isSaving()
  );

  // Watch loading state and disable/enable form controls
  private readonly loadingWatcher = effect(() => {
    const loading = this.isLoading();
    if (loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  });

  // Signal to known if the current mode is specialist or not
  readonly isSpecialist: Signal<boolean> = computed(
    () => this.userMode() === R.SPECIALIST
  );

  // Main Form
  readonly form: FormGroup;

  // Create form
  constructor(private fb: FormBuilder) {
    // Birth date limits logic
    const maxDate = new Date();
    const minDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    minDate.setFullYear(minDate.getFullYear() - 150);
    this.maxBirthDate = maxDate.toISOString().split('T')[0];
    this.minBirthDate = minDate.toISOString().split('T')[0];

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
  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const formData = this.form.value;
    const email = formData.email;
    const password = formData.password;
    const dni = formData.dni;

    try {
      // Validate if DNI already exists
      const dniExists = await this.userFacade.dniExists(dni);
      if (dniExists) {
        this.submitted = true;
        return;
      }

      const userUid = await this.authFacade.register(email, password);
      
      // Check if registration was successful (userUid is not undefined)
      if (!userUid) {
        this.submitted = true;
        return;
      }

      const submitData = this.isSpecialist()
        ? {
            // Clean data for specialist: remove patient fields
            ...this.getSpecialistData(formData),
            id: userUid,
            rol: R.SPECIALIST,
            registrationDate: new Date(),
            status: UserStatus.ACTIVE,
          }
        : {
            // Clean data for patient: remove specialist fields
            ...this.getPatientData(formData),
            id: userUid,
            rol: R.PATIENT,
            registrationDate: new Date(),
            status: UserStatus.ACTIVE,
          };

      console.log('Form values:', formData);
      console.log('Data to submit:', submitData);
      await this.userFacade.createUser(submitData);
      console.log('User successfull created');
    } catch (error) {
      console.error('Register error', error);
      this.submitted = true;
    }
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

    // Map availability string to real object
    let mappedAvailability = availability;
    if (typeof availability === 'string' && availability) {
      const preset = this.availabilityPresets.find(
        (p) => p.name === availability
      );
      mappedAvailability = preset ? preset.value : [];
    }

    return {
      firstName,
      lastName,
      dni,
      sex,
      email,
      birthDate,
      phone,
      specialties,
      availability: mappedAvailability,
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
