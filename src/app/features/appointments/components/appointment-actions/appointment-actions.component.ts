import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";
import { NgClass } from '@angular/common';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';

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
    this.dialogService.open({
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