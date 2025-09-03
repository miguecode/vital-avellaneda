import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import {
  CompleteAppointmentData,
  CompleteAppointmentDialogComponent,
} from '../complete-appointment-dialog/complete-appointment-dialog.component';
import { APPOINTMENT_STATUS_LABELS } from '../../../../core/enums/enum-labels';
import { AppointmentStatus } from '../../../../core/enums';
import { AppointmentInformDialogComponent } from '../appointment-inform-dialog/appointment-inform-dialog.component';
import { Appointment } from '../../../../core/models';
import { Router } from '@angular/router';
import {
  RateAppointmentComponent,
  RateAppointmentData,
} from '../appointment-rate/appointment-rate.component';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-appointment-actions',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './appointment-actions.component.html',
  styleUrl: './appointment-actions.component.css',
  providers: [DatePipe, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentActionsComponent {
  @Input({ required: true }) userRoleToShow!: 'patient' | 'specialist';
  @Input({ required: true }) appointment!: Appointment;
  @Output() cancelAppointment = new EventEmitter<string>();
  @Output() completeAppointment = new EventEmitter<CompleteAppointmentData>();
  @Output() rateAppointment = new EventEmitter<RateAppointmentData>();

  private dialogService = inject(DialogService);
  private datePipe = inject(DatePipe);
  private titleCase = inject(TitleCasePipe);
  private router = inject(Router);

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
      subtitle: `El turno fue cancelado por la/el ${
        this.appointment.canceledBy === 'patient' ? 'paciente' : 'especialista'
      } ${
        this.appointment.canceledBy === 'patient'
          ? this.appointment.patientFirstName +
            ' ' +
            this.appointment.patientLastName
          : this.appointment.specialistFirstName +
            ' ' +
            this.appointment.specialistLastName
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
      subtitle: `Este informe contiene el diagnóstico proporcionado por la/el especialista
       ${this.appointment.specialistFirstName} ${
        this.appointment.specialistLastName
      }, correspondiente al turno de ${
        this.appointment.specialty.name
      } llevado a cabo el día 
       ${
         this.datePipe.transform(this.appointment.date, 'd') +
           ' de ' +
           this.titleCase.transform(
             this.datePipe.transform(this.appointment.date, 'MMMM')
           ) +
           ' de ' +
           this.datePipe.transform(this.appointment.date, 'y') || ''
       }.
       `,
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

  medicalRecordHandler = (): void => {
    this.router.navigate([
      `/dashboard/user-medical-record/${this.appointment.patientId}`,
    ]);
  };

  rateAppointmentHandler = (): void => {
    this.dialogService
      .openGeneric<RateAppointmentComponent, RateAppointmentData>(
        RateAppointmentComponent,
        {
          title: 'Calificar Atención',
          message:
            'Valoramos tu sinceridad. Esta información no será visible para el especialista.',
        }
      )
      .subscribe((result) => {
        if (result) {
          this.rateAppointment.emit(result);
        }
      });
  };

  downloadPdfHandler = (): void => {
    const doc = new jsPDF();
    const appointment = this.appointment;
    const statusLabel = APPOINTMENT_STATUS_LABELS.get(appointment.status) || appointment.status;

    // Titles
    doc.setFontSize(20);
    doc.text('Vital Avellaneda', 105, 25, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Comprobante de Turno', 105, 35, { align: 'center' });

    // Description
    const currentDate = new Date().toLocaleDateString('es-AR');
    const preamble = `Este comprobante de turno fue generado desde el sitio web oficial de Vital Avellaneda, el día ${currentDate}.`;
    doc.setFontSize(10);
    doc.text(preamble, 105, 45, { align: 'center' });

    // Appointment Infor
    doc.setFontSize(12);
    let y = 65;
    y = this.generatePdfLine(doc, y, 'ID del Turno:', appointment.id);
    y = this.generatePdfLine(doc, y + 10, 'Paciente:', `${appointment.patientFirstName} ${appointment.patientLastName}`);
    y = this.generatePdfLine(doc, y + 10, 'Especialista:', `${appointment.specialistFirstName} ${appointment.specialistLastName}`);
    y = this.generatePdfLine(doc, y + 10, 'Especialidad:', appointment.specialty.name);
    y = this.generatePdfLine(doc, y + 10, 'Fecha:', this.datePipe.transform(appointment.date, 'dd/MM/yyyy') || '');
    y = this.generatePdfLine(doc, y + 10, 'Hora:', this.datePipe.transform(appointment.date, 'HH:mm') + ' hs.' || '');
    y = this.generatePdfLine(doc, y + 10, 'Estado:', statusLabel);

    // Advice
    doc.setFontSize(10);
    doc.setTextColor(100);
    const notice = 'Se le recomienda tanto al paciente como al especialista llegar 15 minutos antes de cada sesión. En el Portal de Vital Avellaneda se puede revisar esta información, gestionar el estado del turno y más.';
    const splitNotice = doc.splitTextToSize(notice, 170);
    doc.text(splitNotice, 20, y + 20);

    // Save
    doc.save(`turno-${appointment.id}.pdf`);
  };

  private generatePdfLine(
    doc: any,
    y: number,
    label: string,
    value: string
  ): number {
    doc.text(label, 20, y);
    doc.text(value, 70, y);
    return y;
  }

  get currentActions() {
    const { status } = this.appointment;
    const { userRoleToShow } = this;

    const medicalRecordAction = {
      handler: this.medicalRecordHandler,
      label: 'Ver Historia Clínica',
      icon: 'medicalInformation',
    };

    const downloadMedicalRecordAction = {
      handler: this.downloadPdfHandler,
      label: 'Descargar en PDF',
      icon: 'download',
    };

    let baseActions: any[] = [];

    if (status === AppointmentStatus.COMPLETED) {
      baseActions = [
        {
          handler: this.completedInformHandler,
          label: 'Ver Diagnóstico',
          icon: 'diagnosis',
        },
      ];

      if (userRoleToShow === 'patient' && !this.appointment.rating) {
        baseActions.push({
          handler: this.rateAppointmentHandler,
          label: 'Calificar Atención',
          icon: 'star',
        });
      }
    } else if (status === AppointmentStatus.CANCELED) {
      baseActions = [
        {
          handler: this.canceledInformHandler,
          label: 'Ver Detalle',
          icon: 'eventBusy',
        },
      ];
    } else if (status === AppointmentStatus.PENDING) {
      const cancelAction = {
        handler: this.cancelAppointmentHandler,
        label: 'Cancelar Turno',
        icon: 'eventBusy',
        textColor: 'text-red-secondary',
        bgColor: 'bg-red-primary',
        bgColorHover: 'hover:bg-red-primary/90',
        bgColorActive: 'active:bg-red-primary/80',
      };

      if (userRoleToShow === 'patient') {
        baseActions = [cancelAction];
      } else if (userRoleToShow === 'specialist') {
        baseActions = [
          {
            handler: this.completeAppointmentHandler,
            label: 'Completar Turno',
            icon: 'eventAvailable',
          },
          cancelAction,
        ];
      }
    }

    if (userRoleToShow === 'specialist') {
      return [...baseActions, medicalRecordAction, downloadMedicalRecordAction];
    }

    return [...baseActions, downloadMedicalRecordAction];
  }
}
