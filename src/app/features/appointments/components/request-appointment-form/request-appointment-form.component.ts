import {
  ChangeDetectionStrategy,
  Component,
  inject,
  computed,
  effect,
  signal,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { AppointmentSpecialtySelectorComponent } from '../appointment-specialty-selector/appointment-specialty-selector.component';
import { AppointmentSpecialistSelectorComponent } from '../appointment-specialist-selector/appointment-specialist-selector.component';
import { Specialist, Specialty } from '../../../../core/models';
import { AppointmentDateSelectorComponent } from '../appointment-date-selector/appointment-date-selector.component';
import { AppointmentConfirmComponent } from '../appointment-confirm/appointment-confirm.component';
import { AppointmentFacade } from '../../appointment.facade';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { Router } from '@angular/router';
import { UserFacade } from '../../../auth/user.facade';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

interface Step {
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-request-appointment-form',
  imports: [
    AppointmentSpecialtySelectorComponent,
    AppointmentSpecialistSelectorComponent,
    AppointmentDateSelectorComponent,
    AppointmentConfirmComponent,
    SvgIconComponent,
  ],
  templateUrl: './request-appointment-form.component.html',
  styleUrl: './request-appointment-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestAppointmentFormComponent {
  readonly appointmentFacade = inject(AppointmentFacade);
  readonly userFacade = inject(UserFacade);
  readonly dialogService = inject(DialogService);
  readonly router = inject(Router);
  readonly formCompleted = signal<boolean>(false);
  readonly waitingConfirmation = signal<boolean>(false);

  public steps: Step[] = [
    {
      number: 1,
      title: 'Elegir Especialidad',
      description: 'Seleccioná la atención que necesites.',
    },
    {
      number: 2,
      title: 'Elegir Especialista',
      description:
        'Podés elegir al especialista en caso de tener alguna preferencia.',
    },
    {
      number: 3,
      title: 'Elegir Fecha y Hora',
      description:
        'Seleccioná la fecha y hora del turno, basado en la disponibilidad actual.',
    },
    {
      number: 4,
      title: 'Confirmar Turno',
      description:
        'Revisá la información del turno antes de confirmar la solicitud.',
    },
  ];

  public currentStep = signal<number>(1);
  readonly specialtySelected = signal<Specialty | null>(null);
  readonly specialistSelected = signal<Specialist | null>(null);
  readonly dateTimeSelected = signal<Date | null>(null);

  readonly isNextStepDisabled = computed(() => {
    switch (this.currentStep()) {
      case 1:
        return !this.specialtySelected();
      case 2:
        return !this.specialistSelected();
      case 3:
        return !this.dateTimeSelected();
      default:
        return false;
    }
  });

  constructor() {
    this.userFacade.getUsersByRole('specialist');

    effect(() => {
      if (this.currentStep() === 4) {
        console.group('Form values');
        console.log('Specialty:', this.specialtySelected());
        console.log('Specialist:', this.specialistSelected());
        console.log('DateTime:', this.dateTimeSelected());
        console.groupEnd();
      }
    });
  }

  public onSpecialtySelected(specialty: Specialty | null): void {
    this.specialtySelected.set(specialty);
    this.specialistSelected.set(null);
    this.dateTimeSelected.set(null);
  }
  public onSpecialistSelected(specialist: Specialist | null): void {
    this.specialistSelected.set(specialist);
    this.dateTimeSelected.set(null);
  }
  public onDateTimeSelected(dateTime: Date | null): void {
    this.dateTimeSelected.set(dateTime);
  }

  public nextStep(): void {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.update((prev) => prev + 1);
    }
  }

  public prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((prev) => prev - 1);
    }
  }

  public async onSubmit(): Promise<void> {
    try {
      const specialty = this.specialtySelected();
      const specialist = this.specialistSelected();
      const dateTime = this.dateTimeSelected();

      if (!specialty || !specialist || !dateTime) return;

      this.waitingConfirmation.set(true);

      const newAppointment = await this.appointmentFacade.createAppointment(
        specialty, specialist, dateTime
      );

      if (newAppointment) {
        setTimeout(() => {
          this.dialogService
          .openGeneric<DialogComponent, boolean>(DialogComponent, {
            title: '¡Turno Confirmado!',
            message:
              'Tu turno fue agendado con éxito. Podés ver los detalles y gestionarlo en tu perfil.',
            confirmText: 'Ir a Mi Perfil',
            icon: 'check',
            iconColor: 'text-green-700',
            iconBgColor: 'bg-green-primary',
          })
          .subscribe((result) => {
            if (result) {
              this.router.navigate(['/dashboard/patient']);
            } else {
              this.router.navigate(['/home']);
            }
          });
        }, 150);
      } else throw new Error('No se obtuvo el turno creado. ');
    } catch (error) {
      console.error(error);

      setTimeout(() => {
        this.dialogService
        .openGeneric<DialogComponent, boolean>(DialogComponent, {
          title: 'Error',
          message:
            'Hubo un problema con la solicitud del turno. Intentá más tarde.',
          confirmText: 'Volver al Perfil',
          icon: 'error',
          iconColor: 'text-red-secondary',
          iconBgColor: 'bg-red-primary',
        })
        .subscribe((result) => {
          if (result) {
            this.router.navigate(['/dashboard/patient']);
          } else {
            this.router.navigate(['/home']);
          }
        });
      }, 150);
    } finally {
      this.formCompleted.set(true);
    }
  }
}