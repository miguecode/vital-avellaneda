import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";
import { NgClass } from '@angular/common';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { CompleteAppointmentDialogComponent } from '../complete-appointment-dialog/complete-appointment-dialog.component';

@Component({
  selector: 'app-appointment-actions',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './appointment-actions.component.html',
  styleUrl: './appointment-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentActionsComponent {
  @Input({ required: true }) userRoleToShow!: 'patient' | 'specialist';

  private dialogService = inject(DialogService);

  cancelAppointmentHandler = (): void => {
    this.dialogService.openGeneric<DialogComponent, boolean | string>(DialogComponent, {
      title: 'Cancelar Turno',
      message: '¿Estás eguro de que deseas cancelar este turno? Esta acción no se puede deshacer.',
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
    }).subscribe(result => {
      if (typeof result === 'string') {
        console.log('Turno cancelado. Motivo:', result);
      }
    });
  }

  completeAppointmentHandler = (): void => {
    this.dialogService.openGeneric(CompleteAppointmentDialogComponent, {
      title: 'Completar Turno',
      message: 'Para dar por completado el turno, completá los siguientes datos que serán visibles para el paciente.',
      confirmText: 'Confirmar',
      cancelText: 'Cerrar',
      icon: 'eventAvailable',
    })
      .subscribe(result => {
        if (result) {
          console.log('Resultado del dialogo:', result);
        }
      });
  }

  readonly patientActions = [
    {
      handler: this.cancelAppointmentHandler,
      label: 'Cancelar Turno',
      icon: 'eventBusy',
      textColor: 'text-red-secondary',
      bgColor: 'bg-red-primary',
      bgColorHover: 'hover:bg-red-primary/90',
      bgColorActive:'active:bg-red-primary/80',
    }
  ];

  readonly specialistActions = [
    {
      handler: this.completeAppointmentHandler,
      label: 'Completar Turno',
      icon: 'eventAvailable',
      textColor: '',
      bgColor: '',
      bgColorHover:'',
      bgColorActive: '',
    },
    {
      handler: this.cancelAppointmentHandler,
      label: 'Cancelar Turno',
      icon: 'eventBusy',
      textColor: 'text-red-secondary',
      bgColor: 'bg-red-primary',
      bgColorHover: 'hover:bg-red-primary/90',
      bgColorActive:'active:bg-red-primary/80',
    },
  ];
}