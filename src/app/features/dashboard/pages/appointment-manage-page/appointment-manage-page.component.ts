import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppointmentFacade } from '../../../appointments/appointment.facade';
import { AuthFacade } from '../../../auth/auth.facade';
import { SplashComponent } from '../../../../shared/components/splash/splash.component';
import { AppointmentInfoComponent } from '../../../appointments/components/appointment-info/appointment-info.component';
import { AppointmentUserInfoComponent } from '../../../appointments/components/appointment-user-info/appointment-user-info.component';
import { UserFacade } from '../../../auth/user.facade';
import { UserBase } from '../../../../core/models';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";
import { AppointmentActionsComponent } from "../../../appointments/components/appointment-actions/appointment-actions.component";

@Component({
  selector: 'app-appointment-manage-page',
  standalone: true,
  imports: [
    SplashComponent,
    AppointmentInfoComponent,
    AppointmentUserInfoComponent,
    RouterLink,
    SvgIconComponent,
    AppointmentActionsComponent
],
  templateUrl: './appointment-manage-page.component.html',
  styleUrl: './appointment-manage-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentManagePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly authFacade = inject(AuthFacade);
  readonly userFacade = inject(UserFacade);
  public appointmentFacade = inject(AppointmentFacade);

  appointment = this.appointmentFacade.selectedAppointment;
  isLoading = this.appointmentFacade.isLoading;
  error = this.appointmentFacade.error;
  readonly oppositeUser = signal<UserBase | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('No se encontró un ID de turno en la ruta.');
      this.router.navigate(['/home']);
      return;
    }

    await this.appointmentFacade.loadAppointmentById(id);
    await this.loadOppositeUser();
  }

  private async loadOppositeUser(): Promise<void> {
    const apt = this.appointment();
    const currentUser = this.authFacade.user();

    if (!apt || !currentUser) return;

    const oppositeUserId =
      currentUser.role === 'patient' ? apt.specialistId : apt.patientId;

    const user = await this.userFacade.getUserById(oppositeUserId);
    this.oppositeUser.set(user);
  }
}
