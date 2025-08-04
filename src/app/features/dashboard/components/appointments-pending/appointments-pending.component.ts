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
import { AppointmentStatus } from '../../../../core/enums';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-appointments-pending',
  imports: [SvgIconComponent, DatePipe, TitleCasePipe],
  templateUrl: './appointments-pending.component.html',
  styleUrl: './appointments-pending.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsPendingComponent implements OnInit {
  readonly appointmentFacade = inject(AppointmentFacade);
  readonly pendingAppointments = computed(() =>
    this.appointmentFacade
      .appointments()
      .filter((apt) => apt.status === AppointmentStatus.PENDING)
  );

  readonly loading = signal(false);

  async ngOnInit(): Promise<void> {
    console.log('Appointments Pending Started');

    if (this.appointmentFacade.appointments().length > 0) {
      return;
    }

    this.loading.set(true);

    const minLoaderTimePromise = new Promise((resolve) => setTimeout(resolve, 1800));
    const dataFetchPromise = this.appointmentFacade.loadUserAppointments();

    try {
      await Promise.all([dataFetchPromise, minLoaderTimePromise]);
    } finally {
      this.loading.set(false);
    }
  }
}