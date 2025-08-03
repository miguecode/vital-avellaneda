import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";

@Component({
  selector: 'app-dashboard-access',
  imports: [RouterLink, SvgIconComponent],
  templateUrl: './dashboard-access.component.html',
  styleUrl: './dashboard-access.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAccessComponent {
  public access = [
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
      routerLink: '',
      icon: 'list',
    },
  ];
}
