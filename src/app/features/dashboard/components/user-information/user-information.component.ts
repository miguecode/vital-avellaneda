import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { Patient, Specialist, Specialty, UserBase } from '../../../../core/models';
import { AuthFacade } from '../../../auth/auth.facade';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import {
  ROLE_LABELS,
  STATUS_LABELS,
  SEX_LABELS,
  BLOOD_TYPE_LABELS,
  HEALTH_INSURANCE_LABELS,
  getEnumLabel,
} from '../../../../core/enums/enum-labels';
import { AVAILABILITY_PRESETS_LABELS } from '../../../../core/constants/availability-presets';

@Component({
  selector: 'app-user-information',
  imports: [SvgIconComponent],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInformationComponent {
  private readonly authFacade = inject(AuthFacade);
  readonly user: Signal<UserBase | null> = this.authFacade.user;

  get roleLabel(): string {
    const role = this.user()?.role;
    return role ? ROLE_LABELS.get(role) ?? role : '';
  }
  get statusLabel(): string {
    const status = this.user()?.status;
    return status ? STATUS_LABELS.get(status) ?? status : '';
  }

  // Return personal data as object array { label, value }
  get personalData() {
    const user = this.user();
    if (!user) return [];
    return [
      { label: 'Nombre', value: user.firstName || 'Desconocido' },
      { label: 'Apellido', value: user.lastName || 'Desconocido' },
      { label: 'Edad', value: this.formatAge(user.birthDate) },
      { label: 'Sexo', value: getEnumLabel(SEX_LABELS, user.sex) },
      { label: 'DNI', value: this.formatDni(user.dni) },
      { label: 'Correo', value: user.email || 'Desconocido' },
      { label: 'Teléfono', value: user.phone || 'Sin especificar' },
      { label: 'Fecha de registro', value: this.formatDate(user.registrationDate) },
    ];
  }

  // Return custom data as object array { label, value }
  get customData() {
    const user = this.user();

    // Patient data
    if (user?.role === 'patient') {
      const patient = user as Patient;
      return [
        {
          label: 'Altura',
          value: patient.height ? `${patient.height} cm.` : 'Sin especificar',
        },
        {
          label: 'Peso',
          value: patient.weight ? `${patient.weight} kg.` : 'Sin especificar',
        },
        {
          label: 'Grupo sanguíneo',
          value: getEnumLabel(BLOOD_TYPE_LABELS, patient.bloodType),
        },
        {
          label: 'Obra social',
          value: getEnumLabel(HEALTH_INSURANCE_LABELS, patient.healthInsurance),
        },
        // { label: 'Especificaciones', value: patient.description || '' },
      ];

    // Specialist data
    } else if (user?.role === 'specialist') {
      const specialist = user as Specialist;
      return [
        {
          label: 'Especialidades',
          value: this.formatSpecialties(specialist.specialties),
        },
        {
          label: 'Disponibilidad',
          value: AVAILABILITY_PRESETS_LABELS.get(specialist.availabilityName) ?? specialist.availabilityName,
        },
          /*
        {
          label: 'Turnos completados',
          value: '',
        }
          */
      ]
    }

    return [];
  }

  // Format DNI with dots (like 12.345.678)
  private formatDni(dni?: string): string {
    if (!dni) return 'Desconocido';
    return dni.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  private formatSpecialties(specialties?: Specialty[]): string {
    if (!specialties) return 'Desconocido';
    const specialtiesNames = specialties.map((s) => s.name);
    return specialtiesNames.join(', ');
  }

  // Format date in dd/mm/yyyy
  private formatDate(date: any): string {
    if (!date) return 'Desconocido';
    let d: Date;
    // If it's a Firebase Timestamp
    if (typeof date === 'object' && typeof date.toDate === 'function') {
      d = date.toDate();
    } else {
      d = new Date(date);
    }
    if (isNaN(d.getTime())) return 'Desconocido';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Calcula la edad a partir de la fecha de nacimiento y la muestra como 'X años'
  private formatAge(birthDate: any): string {
    if (!birthDate) return 'Desconocido';
    let d: Date;
    if (typeof birthDate === 'object' && typeof birthDate.toDate === 'function') {
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
}
