import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { AppointmentFacade } from '../../../appointments/appointment.facade';
import { DatePipe } from '@angular/common';
import { AuthFacade } from '../../../auth/auth.facade';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointments-table',
  imports: [SvgIconComponent, DatePipe, RouterLink],
  templateUrl: './appointments-table.component.html',
  styleUrl: './appointments-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsTableComponent {
  readonly authFacade = inject(AuthFacade);
  readonly appointmentFacade = inject(AppointmentFacade);
  readonly appointments = this.appointmentFacade.appointments;

  // Pagination Signals
  readonly itemsPerPage = signal(4);
  readonly currentPage = signal(1);

  readonly totalPages = computed(() => {
    return Math.ceil(this.appointments().length / this.itemsPerPage());
  });

  readonly displayedAppointments = computed(() => {
    const user = this.authFacade.user();
    if (!user) return [];

    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.appointments().slice(startIndex, endIndex);
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

  // Pagination Methods
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
