import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import {
  Patient,
  Specialist,
  Specialty,
  UserBase,
} from '../../../../core/models';
import {
  BLOOD_TYPE_LABELS,
  getEnumLabel,
  ROLE_LABELS,
  SEX_LABELS,
  STATUS_LABELS,
} from '../../../../core/enums/enum-labels';
import { AVAILABILITY_PRESETS_LABELS } from '../../../../core/constants/availability-presets';
import { CloudinaryService } from '../../../../services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-appointment-user-info',
  imports: [SvgIconComponent],
  templateUrl: './appointment-user-info.component.html',
  styleUrl: './appointment-user-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentUserInfoComponent implements OnInit {
  @Input({ required: true }) user!: UserBase | null;
  @Input({ required: true }) userRoleToShow!: 'patient' | 'specialist';

  readonly minTimePassed = signal(false);
  readonly showContent = computed(() => this.minTimePassed() && !!this.user);

  private readonly cloudinaryService = inject(CloudinaryService);
  private readonly elementRef = inject(ElementRef);
  readonly defaultProfilePictureUrl =
    this.cloudinaryService.defaultProfilePictureUrl;

  constructor() {
    // Effect to handle image loading animations
    effect(() => {
      this.showContent();

      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const images: NodeListOf<HTMLImageElement> =
            this.elementRef.nativeElement.querySelectorAll('.img-fade-in');
          images.forEach((image) => {
            if (image && !image.classList.contains('is-loaded')) {
              if (image.complete) {
                image.classList.add('is-loaded');
              } else {
                image.addEventListener(
                  'load',
                  () => {
                    image.classList.add('is-loaded');
                  },
                  { once: true }
                );
              }
            }
          });
        }
      });
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.minTimePassed.set(true);
    }, 1000);
  }

  get title(): string {
    return this.userRoleToShow === 'patient' ? 'Paciente' : 'Especialista';
  }

  get roleLabel(): string {
    const role = this.user?.role;
    return role ? ROLE_LABELS.get(role) ?? role : '';
  }
  get statusLabel(): string {
    const status = this.user?.status;
    return status ? STATUS_LABELS.get(status) ?? status : '';
  }

  // Return personal data as object array { label, value }
  get personalData() {
    const user = this.user;
    if (!user) return [];
    return [
      {
        label: 'Nombre',
        value: user.firstName + ' ' + user.lastName || 'Desconocido',
      },
      { label: 'Sexo', value: getEnumLabel(SEX_LABELS, user.sex) },
    ];
  }

  // Return custom data as object array { label, value }
  get customData() {
    const user = this.user;

    // Patient data
    if (this.userRoleToShow === 'patient') {
      const patient = user as Patient;
      return [
        {
          label: 'Edad: ',
          value: this.formatAge(user?.birthDate),
        },
        {
          label: 'Altura: ',
          value: patient.height ? `${patient.height} cm.` : 'Sin especificar',
        },
        {
          label: 'Peso: ',
          value: patient.weight ? `${patient.weight} kg.` : 'Sin especificar',
        },
        {
          label: 'Grupo sanguíneo: ',
          value: getEnumLabel(BLOOD_TYPE_LABELS, patient.bloodType),
        },
      ];

      // Specialist data
    } else if (this.userRoleToShow === 'specialist') {
      const specialist = user as Specialist;
      return [
        {
          label: 'Especialidades: ',
          value: this.formatSpecialties(specialist.specialties),
        },
        {
          label: 'Disponibilidad horaria: ',
          value:
            AVAILABILITY_PRESETS_LABELS.get(specialist.availabilityName) ??
            specialist.availabilityName,
        },
      ];
    }
    return [];
  }

  private formatSpecialties(specialties?: Specialty[]): string {
    if (!specialties) return 'Desconocido';
    const specialtiesNames = specialties.map((s) => s.name);
    return specialtiesNames.join(', ');
  }

  // Calculate and format age
  private formatAge(birthDate: any): string {
    if (!birthDate) return 'Desconocido';
    let d: Date;
    if (
      typeof birthDate === 'object' &&
      typeof birthDate.toDate === 'function'
    ) {
      d = birthDate.toDate();
    } else {
      d = new Date(birthDate);
    }
    if (isNaN(d.getTime())) return 'Desconocido';
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
      age--;
    }
    return `${age} años`;
  }

  readonly profilePictureUrl = computed(() => {
    if (this.user && this.user.profilePictureUrl) {
      return this.cloudinaryService.getTransformedUrl(
        this.user.profilePictureUrl,
        'w_40,h_40,c_fill,g_face,f_webp'
      );
    }
    return this.defaultProfilePictureUrl;
  });
}
