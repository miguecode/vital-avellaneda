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

@Component({
  selector: 'app-appointments-finished',
  imports: [SvgIconComponent, DatePipe, TitleCasePipe],
  templateUrl: './appointments-finished.component.html',
  styleUrl: './appointments-finished.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsFinishedComponent {
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

  async ngOnInit(): Promise<void> {
    console.log('Appointments Finished Started');

    if (this.appointmentFacade.appointments().length > 0) {
      return;
    }

    this.loading.set(true);

    const minLoaderTimePromise = new Promise((resolve) =>
      setTimeout(resolve, 1800)
    );
    const dataFetchPromise = this.appointmentFacade.loadUserAppointments();

    try {
      await Promise.all([dataFetchPromise, minLoaderTimePromise]);
    } finally {
      this.loading.set(false);
    }
  }
}
