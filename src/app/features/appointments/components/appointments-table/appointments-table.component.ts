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
import { Appointment } from '../../../../core/models/appointment.model';

type SortDirection = 'asc' | 'desc' | 'none';

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
  readonly itemsPerPage = signal(6);
  readonly currentPage = signal(1);

  // Sorting Signals
  readonly sortConfig = signal<{ key: string; direction: SortDirection }>({
    key: '',
    direction: 'none',
  });

  readonly sortedAppointments = computed(() => {
    const appointments = [...this.appointments()];
    const config = this.sortConfig();
    const userRole = this.authFacade.user()?.role;

    if (config.direction === 'none' || !config.key) {
      return appointments;
    }

    const getKeyValue = (appointment: Appointment, key: string) => {
      if (key === 'lastName') {
        return userRole === 'patient'
          ? appointment.specialistLastName
          : appointment.patientLastName;
      }
      if (key === 'specialty.name') {
        return appointment.specialty.name;
      }
      return appointment[key as keyof Appointment];
    };

    appointments.sort((a, b) => {
      const valA = getKeyValue(a, config.key);
      const valB = getKeyValue(b, config.key);

      const aValue = typeof valA === 'string' ? valA.toLowerCase() : valA;
      const bValue = typeof valB === 'string' ? valB.toLowerCase() : valB;

      if (aValue! < bValue!) {
        return config.direction === 'asc' ? -1 : 1;
      }
      if (aValue! > bValue!) {
        return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return appointments;
  });

  readonly totalPages = computed(() => {
    return Math.ceil(this.sortedAppointments().length / this.itemsPerPage());
  });

  readonly displayedAppointments = computed(() => {
    const sorted = this.sortedAppointments();
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return sorted.slice(startIndex, endIndex);
  });

  readonly pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const sideWidth = 1; // pages on each side of current
    const pages: (number | string)[] = [];
    if (total <= 1) {
      return [];
    }

    pages.push(1);

    if (current > sideWidth + 2) {
      pages.push('...');
    }

    const startPage = Math.max(2, current - sideWidth);
    const endPage = Math.min(total - 1, current + sideWidth);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (current < total - sideWidth - 1) {
      pages.push('...');
    }

    if (total > 1) {
      pages.push(total);
    }

    const uniquePages = [...new Set(pages)];
    return uniquePages;
  });

  readonly loading = signal(false);
  private lastLoadedUserId: string | null = null;

  async ngOnInit(): Promise<void> {
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

  // Sorting
  applySort(key: string): void {
    this.currentPage.set(1);
    const currentConfig = this.sortConfig();
    let newDirection: SortDirection = 'asc';

    if (currentConfig.key === key) {
      if (currentConfig.direction === 'asc') {
        newDirection = 'desc';
      } else if (currentConfig.direction === 'desc') {
        newDirection = 'none';
      }
    }

    this.sortConfig.set({
      key: newDirection === 'none' ? '' : key,
      direction: newDirection,
    });
  }

  // Pagination
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
