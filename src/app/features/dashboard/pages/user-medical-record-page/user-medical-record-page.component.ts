import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { SplashComponent } from '../../../../shared/components/splash/splash.component';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { TitleDescriptionComponent } from '../../../../shared/components/title-description/title-description.component';
import { AuthFacade } from '../../../auth/auth.facade';
import { AppointmentFacade } from '../../../appointments/appointment.facade';
import { UserBase, Appointment } from '../../../../core/models';
import { AppointmentInformDialogComponent } from '../../../appointments/components/appointment-inform-dialog/appointment-inform-dialog.component';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-user-medical-record-page',
  imports: [
    SplashComponent,
    SvgIconComponent,
    DatePipe,
    TitleDescriptionComponent,
    RouterLink,
  ],
  templateUrl: './user-medical-record-page.component.html',
  styleUrl: './user-medical-record-page.component.css',
  providers: [DatePipe, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMedicalRecordPageComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly appointmentFacade = inject(AppointmentFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly navigationService = inject(NavigationService);

  private dialogService = inject(DialogService);
  private datePipe = inject(DatePipe);
  private titleCase = inject(TitleCasePipe);

  readonly user: Signal<UserBase | null> = this.authFacade.user;
  readonly isCheckingAuth: Signal<boolean> = this.authFacade.isCheckingAuth;

  readonly backButtonText = signal('Perfil');
  readonly backButtonUrl = signal(['/dashboard/patient']);

  readonly minTimePassed = signal(false);
  readonly showContent = computed(
    () => this.minTimePassed() && !!this.user && this.entries()
  );

  readonly entries: Signal<Appointment[] | null> =
    this.appointmentFacade.viewedPatientAppointments;

  constructor() {
    effect(() => {
      const previousUrl = this.navigationService.previousUrl();
      const user = this.authFacade.user();

      if (previousUrl && previousUrl.includes('appointments-manage')) {
        this.backButtonText.set('Turno');
        this.backButtonUrl.set([previousUrl]);
      } else {
        this.backButtonText.set('Perfil');
        if (user?.role === 'specialist') {
          this.backButtonUrl.set(['/dashboard/specialist']);
        } else {
          this.backButtonUrl.set(['/dashboard/patient']);
        }
      }
    });
  }

  async ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('id');

    if (patientId) {
      await this.appointmentFacade.loadCompletedAppointmentsByPatientId(
        patientId
      );
    }

    setTimeout(() => {
      this.minTimePassed.set(true);
    }, 1000);
  }

  openDiagnosisDialog = (appointment: Appointment): void => {
    this.dialogService.openGeneric(AppointmentInformDialogComponent, {
      title: 'Diagnóstico',
      subtitle: `Este informe contiene el diagnóstico proporcionado por el especialista
        ${appointment.specialistFirstName} ${
        appointment.specialistLastName
      }, correspondiente al turno de ${
        appointment.specialty.name
      } llevado a cabo el día 
        ${
          this.datePipe.transform(appointment.date, 'd') +
            ' de ' +
            this.titleCase.transform(
              this.datePipe.transform(appointment.date, 'MMMM')
            ) +
            ' de ' +
            this.datePipe.transform(appointment.date, 'y') || ''
        }.
        `,
      icon: 'diagnosis',
      inform: [
        {
          label: 'Detalle general',
          value: appointment.diagnosis?.details! || 'Sin especificar',
        },
        {
          label: 'Recetas e indicaciones',
          value: appointment.diagnosis?.prescriptions! || 'Sin especificar',
        },
        {
          label: 'Otras anotaciones',
          value:
            appointment.diagnosis?.anotations! || 'Sin anotaciones extras.',
        },
      ],
    });
  };
}