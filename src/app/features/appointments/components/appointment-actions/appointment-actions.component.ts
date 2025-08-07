import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-appointment-actions',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './appointment-actions.component.html',
  styleUrl: './appointment-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentActionsComponent {
  @Input({ required: true }) userRoleToShow!: 'patient' | 'specialist';

  readonly patientActions = [
    {
      handler: this.cancelAppointmentHandler,
      label: 'Cancelar Turno',
      icon: 'eventBusy',
      textColor: '',
      bgColor: '',
      bgColorHover:'',
      bgColorActive: '',
    }
  ];

  readonly specialistActions = [
    {
      handler: this.completeAppointmentHandler,
      label: 'Completar Turno',
      icon: 'check',
      textColor: '',
      bgColor: '',
      bgColorHover:'',
      bgColorActive: '',
    },
    {
      handler: this.cancelAppointmentHandler,
      label: 'Cancelar Turno',
      icon: 'eventBusy',
      textColor: '',
      bgColor: '',
      bgColorHover:'',
      bgColorActive: '',
    },
  ];

  cancelAppointmentHandler(): void {

  }

  completeAppointmentHandler(): void {

  }
}