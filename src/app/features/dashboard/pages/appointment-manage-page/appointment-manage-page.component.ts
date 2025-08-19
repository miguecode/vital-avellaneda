import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
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
import { Diagnosis, Patient, Rating, UserBase } from '../../../../core/models';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { AppointmentActionsComponent } from '../../../appointments/components/appointment-actions/appointment-actions.component';
import { CompleteAppointmentData } from '../../../appointments/components/complete-appointment-dialog/complete-appointment-dialog.component';
import { AppointmentStatus, UserRoles } from '../../../../core/enums';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { RateAppointmentData } from '../../../appointments/components/appointment-rate/appointment-rate.component';

@Component({
  selector: 'app-appointment-manage-page',
  imports: [
    SplashComponent,
    AppointmentInfoComponent,
    AppointmentUserInfoComponent,
    RouterLink,
    SvgIconComponent,
    AppointmentActionsComponent,
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
  private readonly navigationService = inject(NavigationService);

  appointment = this.appointmentFacade.selectedAppointment;
  isLoading = this.appointmentFacade.isLoading;
  error = this.appointmentFacade.error;
  readonly oppositeUser = signal<UserBase | null>(null);

  readonly backButtonText = signal('Perfil');
  readonly backButtonUrl = signal(['/dashboard/patient']);

  constructor() {
    effect(() => {
      const previousUrl = this.navigationService.previousUrl();
      const user = this.authFacade.user();

      if (previousUrl && previousUrl.includes('/dashboard/specialist')) {
        this.navigationService.setManageFromList(false);
      }

      if (previousUrl && this.navigationService.manageFromList()) {
        this.backButtonText.set('Turnos');
        this.backButtonUrl.set(['/dashboard/appointments-list']);
      } else {
        if (previousUrl && previousUrl.includes('appointments-list')) {
          this.backButtonText.set('Turnos');
          this.backButtonUrl.set([previousUrl]);
          this.navigationService.setManageFromList(true);
        } else {
          this.backButtonText.set('Perfil');
          this.navigationService.setManageFromList(false);
          if (user?.role === 'specialist') {
            this.backButtonUrl.set(['/dashboard/specialist']);
          } else {
            this.backButtonUrl.set(['/dashboard/patient']);
          }
        }
      }
    });
  }

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
      currentUser.role === UserRoles.PATIENT ? apt.specialistId : apt.patientId;

    const user = await this.userFacade.getUserById(oppositeUserId);
    this.oppositeUser.set(user);
  }

  async handleCancelAppointment(reason: string): Promise<void> {
    if (reason) {
      const appointmentId = this.appointment()?.id;
      if (appointmentId) {
        await this.appointmentFacade.updateAppointment(appointmentId, {
          cancellationReason: reason,
          canceledBy: this.authFacade.user()?.role,
          status: AppointmentStatus.CANCELED,
        });
      }
    }
  }

  async handleCompleteAppointment(
    data: CompleteAppointmentData
  ): Promise<void> {
    if (data) {
      const { details, prescriptions, anotations, height, weight } = data;

      const diagnosis: Diagnosis = {
        details,
        prescriptions,
      };

      if (anotations && anotations.trim() !== '') {
        diagnosis.anotations = anotations;
      }

      const appointmentId = this.appointment()?.id;
      if (appointmentId) {
        await this.appointmentFacade.updateAppointment(appointmentId, {
          diagnosis: diagnosis,
          status: AppointmentStatus.COMPLETED,
        });
      }

      const oppositeUser = this.oppositeUser();
      if (!oppositeUser || !oppositeUser.id) {
          console.warn('No opposite user found to update height/weight.');
        return;
      }

      const userUpdates: Partial<Patient> = {};

      const parsedHeight = typeof height === 'string' ? parseFloat(height) : height;
      if (typeof parsedHeight === 'number' && parsedHeight >= 100 && parsedHeight <= 250) {
        userUpdates.height = parsedHeight;
      }

      const parsedWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
      if (typeof parsedWeight === 'number' && parsedWeight >= 30 && parsedWeight <= 250) {
        userUpdates.weight = parsedWeight;
      }

      if (Object.keys(userUpdates).length > 0) {
        await this.userFacade.updateUser({ ...userUpdates, id: this.oppositeUser()?.id });
        await this.loadOppositeUser();
      }
    }
  }

  async handleRateAppointment(data: RateAppointmentData | null): Promise<void> {
    if (data) {
      const { score, comment } = data;
      const rating: Rating = {
        score,
      };

      if (comment && comment.trim() !== '') {
        rating.comment = comment;
      }
      const appointmentId = this.appointment()?.id;
      if (appointmentId) {
        await this.appointmentFacade.updateAppointment(appointmentId, {
          rating: rating,
        });
      }
    }
  }
}