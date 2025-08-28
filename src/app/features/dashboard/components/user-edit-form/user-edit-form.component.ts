import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
  Signal,
  computed,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Patient, Specialist, Specialty, UserBase } from '../../../../core/models';
import { Sex } from '../../../../core/enums';
import { SEX_LABELS } from '../../../../core/enums/enum-labels';
import { CustomValidators } from '../../../../core/validators/custom-validators';
import { InputCustomComponent } from '../../../auth/components/input-custom/input-custom.component';
import { SelectCustomComponent } from '../../../auth/components/select-custom/select-custom.component';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { UserFacade } from '../../../auth/user.facade';
import { AuthFacade } from '../../../auth/auth.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserRoles } from '../../../../core/enums/user-roles.enum';
import { HEALTH_INSURANCE_LABELS } from '../../../../core/enums/enum-labels';
import { HealthInsurances } from '../../../../core/enums/health-insurances.enum';
import { Router } from '@angular/router';
import { APP_SHARED_INFO } from '../../../../core/config/app-info';
import { SpecialtySelectorComponent } from "../../../auth/components/specialty-selector/specialty-selector.component";
import { CloudinaryService } from '../../../../services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-user-edit-form',
  imports: [
    ReactiveFormsModule,
    InputCustomComponent,
    SelectCustomComponent,
    SvgIconComponent,
    SpecialtySelectorComponent
],
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly userFacade = inject(UserFacade);
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly cloudinaryService = inject(CloudinaryService);

  readonly profilePictureUrl: WritableSignal<string> = signal('');
  readonly selectedFile: WritableSignal<File | null> = signal(null);

  readonly user: Signal<UserBase | null> = this.authFacade.user;
  readonly sexOptions = Object.values(Sex);
  readonly sexLabels = SEX_LABELS;
  readonly isLoading: Signal<boolean> = this.userFacade.isSaving;

  readonly healthInsuranceOptions = Object.values(HealthInsurances);
  readonly healthInsuranceLabels = HEALTH_INSURANCE_LABELS;

  readonly email = APP_SHARED_INFO.contact.email;
  readonly phone = APP_SHARED_INFO.contact.phone;

  readonly isSpecialist = computed(
    () => this.user()?.role === UserRoles.SPECIALIST
  );

  showSpecialtyModal = signal(false);
  openModal() {
    this.showSpecialtyModal.set(true);
  }
  closeModal() {
    this.showSpecialtyModal.set(false);
  }
  onSpecialtiesSelected(specialties: Specialty[]) {
    this.form.get('specialties')?.setValue([...specialties]);
    this.closeModal();
  }

  form!: FormGroup;
  submitted = false;

  // Signal with the current value form
  formValue!: Signal<any>;

  // Computed signals (detect changes)
  hasChanges!: Signal<boolean>;

  constructor() {
    if (this.isSpecialist()) {
      this.form = this.fb.group({
        firstName: ['', [Validators.required, CustomValidators.name(2, 30)]],
        lastName: ['', [Validators.required, CustomValidators.name(2, 30)]],
        dni: ['', [Validators.required, CustomValidators.dni(7, 9)]],
        sex: ['', Validators.required],
        phone: ['', CustomValidators.phoneOptional(8, 15)],
        specialties: [[], [Validators.required, Validators.minLength(1)]],
      });
    } else {
      this.form = this.fb.group({
        firstName: ['', [Validators.required, CustomValidators.name(2, 30)]],
        lastName: ['', [Validators.required, CustomValidators.name(2, 30)]],
        dni: ['', [Validators.required, CustomValidators.dni(7, 9)]],
        sex: ['', Validators.required],
        phone: ['', CustomValidators.phoneOptional(8, 15)],
        healthInsurance: ['', Validators.required],
      });
    }

    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.profilePictureUrl.set(currentUser.profilePictureUrl || this.cloudinaryService.defaultProfilePictureUrl);
        this.form.patchValue({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          dni: currentUser.dni,
          sex: currentUser.sex,
          phone: currentUser.phone,
          ...(currentUser.hasOwnProperty('healthInsurance') && {
            healthInsurance: (currentUser as Patient).healthInsurance,
          }),
          ...(currentUser.hasOwnProperty('specialties') && {
            specialties: (currentUser as Specialist).specialties,
          }),
        });
      }
    });

    // Initialize signals
    this.formValue = toSignal(this.form.valueChanges, {
      initialValue: this.form.value,
    });
    this.hasChanges = computed(() => this.changedValues());
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid) return;

    try {
      const updatedData: Partial<Patient | Specialist> & { id: string } = { ...this.form.value, id: this.user()?.id };

      if (this.selectedFile()) {
        const newProfilePictureUrl = await this.cloudinaryService.uploadImage(this.selectedFile()!);
        updatedData.profilePictureUrl = newProfilePictureUrl;
      }

      await this.userFacade.updateUser(updatedData);
      this.router.navigate([
        this.user()?.role === 'patient'
          ? '/dashboard/patient'
          : '/dashboard/specialist',
      ]);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  }

  changedValues(): boolean {
    if (this.selectedFile()) return true;

    const currentUser = this.user();
    const formValue = this.formValue();
    if (!currentUser || !formValue) return false;
  
    const isPatient = currentUser.hasOwnProperty('healthInsurance');
    const isSpecialist = currentUser.hasOwnProperty('specialties');
  
    const baseCheck =
      formValue['firstName'] === currentUser.firstName &&
      formValue['lastName'] === currentUser.lastName &&
      formValue['dni'] === currentUser.dni &&
      formValue['sex'] === currentUser.sex &&
      formValue['phone'] === currentUser.phone;
  
    const patientCheck =
      !isPatient ||
      formValue['healthInsurance'] ===
        (currentUser as Patient).healthInsurance;
  
    const specialistCheck =
      !isSpecialist ||
      this.arraysAreEqual(
        formValue['specialties'],
        (currentUser as Specialist).specialties
      );
  
    return !(baseCheck && patientCheck && specialistCheck);
  }
  
  arraysAreEqual(a: Specialty[], b: Specialty[]): boolean {
    const idsA = a.map(s => s.id).sort();
    const idsB = b.map(s => s.id).sort();
    return JSON.stringify(idsA) === JSON.stringify(idsB);
  } 

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile.set(file);
      this.profilePictureUrl.set(URL.createObjectURL(file));
    }
  }
}
