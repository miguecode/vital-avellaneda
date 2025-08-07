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

  cancelAppointmentHandler(): void {

  }

  completeAppointmentHandler(): void {

  }
}