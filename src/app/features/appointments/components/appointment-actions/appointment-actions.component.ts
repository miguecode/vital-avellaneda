import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { NgClass } from '@angular/common';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import {
  CompleteAppointmentData,
  CompleteAppointmentDialogComponent,
} from '../complete-appointment-dialog/complete-appointment-dialog.component';
import { AppointmentStatus } from '../../../../core/enums';
import { AppointmentInformDialogComponent } from '../appointment-inform-dialog/appointment-inform-dialog.component';
import { Appointment } from '../../../../core/models';

@Component({
  selector: 'app-appointment-actions',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './appointment-actions.component.html',
  styleUrl: './appointment-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentActionsComponent {
  @Input({ required: true }) userRoleToShow!: 'patient' | 'specialist';
  @Input({ required: true }) appointment!: Appointment;
  @Output() cancelAppointment = new EventEmitter<string>();
  @Output() completeAppointment = new EventEmitter<CompleteAppointmentData>();

  private dialogService = inject(DialogService);

  cancelAppointmentHandler = (): void => {
    this.dialogService
      .openGeneric<DialogComponent, boolean | string>(DialogComponent, {
        title: 'Cancelar Turno',
        message:
          '¿Estás seguro de que deseas cancelar este turno? Esta acción no se puede deshacer.',
        confirmText: 'Cancelar Turno',
        confirmTextColor: 'text-red-secondary',
        confirmTextBgColor: 'bg-red-primary',
        confirmTextBgColorHover: 'not-disabled:hover:bg-red-primary/90',
        confirmTextBgColorActive: 'not-disabled:active:bg-red-primary/80',
        cancelText: 'Cerrar',
        icon: 'eventBusy',
        iconColor: 'text-red-secondary',
        iconBgColor: 'bg-red-primary',
        showInput: true,
        inputLabel: 'Motivo de la cancelación',
        inputPlaceholder: 'Escribí acá por qué querés cancelar el turno...',
        textareaRows: 3,
        inputMaxLength: 255,
      })
      .subscribe((result) => {
        if (typeof result === 'string') {
          this.cancelAppointment.emit(result);
        }
      });
  };

  completeAppointmentHandler = (): void => {
    this.dialogService
      .openGeneric<CompleteAppointmentDialogComponent, CompleteAppointmentData>(
        CompleteAppointmentDialogComponent,
        {
          title: 'Completar Turno',
          message:
            'Para dar por completado el turno, completá los siguientes datos. Serán visibles para el paciente.',
          confirmText: 'Confirmar',
          cancelText: 'Cerrar',
          icon: 'eventAvailable',
        }
      )
      .subscribe((result) => {
        if (result) {
          this.completeAppointment.emit(result);
        }
      });
  };

  canceledInformHandler = (): void => {
    this.dialogService.openGeneric(AppointmentInformDialogComponent, {
      title: 'Turno Cancelado',
      subtitle: `El turno fue cancelado por el ${
        this.appointment.canceledBy === 'patient' ? 'paciente' : 'especialista'
      } ${
        this.appointment.canceledBy === 'patient'
          ? this.appointment.patientLastName
          : this.appointment.specialistLastName
      }. El motivo de la cancelación se muestra a continuación en este informe.`,
      icon: 'eventBusy',
      inform: [
        {
          label: 'Motivo de Cancelación',
          value: this.appointment.cancellationReason! || 'Sin especificar.',
        },
      ],
    });
  };

  completedInformHandler = (): void => {
    this.dialogService.openGeneric(AppointmentInformDialogComponent, {
      title: 'Diagnóstico',
      subtitle: `El turno fue completado con éxito, y el diagnóstico proporcionado por el especialista
       ${this.appointment.specialistFirstName} ${this.appointment.specialistLastName} se muestra a continuación en este informe separado por secciones.`,
      icon: 'diagnosis',
      inform: [
        {
          label: 'Detalle general',
          value: this.appointment.diagnosis?.details! || 'Sin especificar',
        },
        {
          label: 'Recetas e indicaciones',
          value:
            this.appointment.diagnosis?.prescriptions! || 'Sin especificar',
        },
        {
          label: 'Otras anotaciones',
          value:
            this.appointment.diagnosis?.anotations! ||
            'Sin anotaciones extras.',
        },
      ],
    });
  };

  get currentActions() {
    if (this.appointment.status === AppointmentStatus.COMPLETED) {
      return [
        {
          handler: this.completedInformHandler,
          label: 'Ver Diagnóstico',
          icon: 'diagnosis',
        },
      ];
    }

    if (this.appointment.status === AppointmentStatus.CANCELED) {
      return [
        {
          handler: this.canceledInformHandler,
          label: 'Ver Detalle',
          icon: 'eventBusy',
        },
      ];
    }

    // Patient Actions
    if (this.userRoleToShow === 'patient') {
      if (this.appointment.status === AppointmentStatus.PENDING) {
        return [
          {
            handler: this.cancelAppointmentHandler,
            label: 'Cancelar Turno',
            icon: 'eventBusy',
            textColor: 'text-red-secondary',
            bgColor: 'bg-red-primary',
            bgColorHover: 'hover:bg-red-primary/90',
            bgColorActive: 'active:bg-red-primary/80',
          },
        ];
      }

      // Specialist Actions
    } else if (this.userRoleToShow === 'specialist') {
      if (this.appointment.status === AppointmentStatus.PENDING) {
        return [
          {
            handler: this.completeAppointmentHandler,
            label: 'Completar Turno',
            icon: 'eventAvailable',
          },
          {
            handler: this.cancelAppointmentHandler,
            label: 'Cancelar Turno',
            icon: 'eventBusy',
            textColor: 'text-red-secondary',
            bgColor: 'bg-red-primary',
            bgColorHover: 'hover:bg-red-primary/90',
            bgColorActive: 'active:bg-red-primary/80',
          },
        ];
      }
    }
    return [];
  }
}
