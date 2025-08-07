import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";
import { AuthFacade } from '../../../auth/auth.facade';

@Component({
  selector: 'app-dashboard-access',
  imports: [RouterLink, SvgIconComponent],
  templateUrl: './dashboard-access.component.html',
  styleUrl: './dashboard-access.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAccessComponent {
  readonly authFacade = inject(AuthFacade);

  public patientAccess = [
    {
      title: 'Solicitar nuevo Turno',
      routerLink: '/dashboard/request-appointment',
      icon: 'assigmentAdd',
    },
    {
      title: 'Ver Historia Clínica',
      routerLink: '',
      icon: 'medicalInformation',
    },
    {
      title: 'Ver Lista de Turnos',
      routerLink: '/dashboard/appointments-list',
      icon: 'list',
    },
  ];

  public specialistAccess = [
    {
      title: 'Ver mis Pacientes',
      routerLink: '',
      icon: 'patient',
    },
    {
      title: 'Ver Lista de Turnos',
      routerLink: '',
      icon: 'list',
    },
  ];
}
