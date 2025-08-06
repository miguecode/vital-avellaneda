import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { AppointmentFacade } from '../../../appointments/appointment.facade';
import { AppointmentStatus, UserRoles } from '../../../../core/enums';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AuthFacade } from '../../../auth/auth.facade';

@Component({
  selector: 'app-appointments-pending',
  imports: [SvgIconComponent, DatePipe, TitleCasePipe],
  templateUrl: './appointments-pending.component.html',
  styleUrl: './appointments-pending.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsPendingComponent implements OnInit {
  readonly authFacade = inject(AuthFacade);
  readonly appointmentFacade = inject(AppointmentFacade);
  readonly pendingAppointments = computed(() =>
    this.appointmentFacade
      .appointments()
      .filter((apt) => apt.status === AppointmentStatus.PENDING)
  );
  readonly displayedPendingAppointments = computed(() => {
    const user = this.authFacade.user();
    if (user?.role === UserRoles.PATIENT) {
      return this.pendingAppointments().slice(0, 3);
    } else if (user?.role === UserRoles.SPECIALIST) {
      return this.pendingAppointments().slice(0, 6);
    }
    return [];
  });

  readonly loading = signal(false);
  private lastLoadedUserId: string | null = null;

  async ngOnInit(): Promise<void> {
    console.log('Appointments Pending Started');

    const currentUser = this.authFacade.user();
    if (
      this.appointmentFacade.appointments().length > 0 ||
      currentUser?.id === this.lastLoadedUserId
    ) {
      return;
    }

    this.loading.set(true);

    const minLoaderTimePromise = new Promise((resolve) =>
      setTimeout(resolve, 1800)
    );
    const dataFetchPromise = this.appointmentFacade.loadUserAppointments();

    try {
      await Promise.all([dataFetchPromise, minLoaderTimePromise]);
      this.lastLoadedUserId = currentUser?.id ?? null;
    } finally {
      this.loading.set(false);
    }
  }

  /* public specialistButtons = [
    {
      title: 'Ver más',
      icon: 'assignment',
      action: '',
    },
    {
      title: 'Finalizar',
      icon: 'eventAvailable',
      action: '',
    },
    {
      title: 'Cancelar',
      icon: 'eventBusy',
      action: '',
    }
  ] */
}
