import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { AppointmentFacade } from '../../../appointments/appointment.facade';
import { AppointmentStatus } from '../../../../core/enums';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AuthFacade } from '../../../auth/auth.facade';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointments-finished',
  imports: [SvgIconComponent, DatePipe, TitleCasePipe, RouterLink],
  templateUrl: './appointments-finished.component.html',
  styleUrl: './appointments-finished.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsFinishedComponent {
  readonly authFacade = inject(AuthFacade);
  readonly appointmentFacade = inject(AppointmentFacade);
  readonly finishedAppointments = computed(() =>
    this.appointmentFacade
      .appointments()
      .filter(
        (apt) =>
          apt.status === AppointmentStatus.COMPLETED ||
          apt.status === AppointmentStatus.CANCELED
      )
  );
  readonly displayedFinishedAppointments = computed(() =>
    this.finishedAppointments().slice(0, 3)
  );

  readonly loading = signal(false);
  private lastLoadedUserId: string | null = null;

  async ngOnInit(): Promise<void> {
    console.log('Appointments Finished Started');

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
}
