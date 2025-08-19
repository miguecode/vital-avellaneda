import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { AuthFacade } from '../../../auth/auth.facade';
import { UserFacade } from '../../../auth/user.facade';
import { Patient } from '../../../../core/models';
import { RouterLink } from '@angular/router';

type SortDirection = 'asc' | 'desc' | 'none';

@Component({
  selector: 'app-patients-table',
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsTableComponent implements OnInit {
  readonly authFacade = inject(AuthFacade);
  readonly userFacade = inject(UserFacade);
  readonly patients = this.userFacade.patients;

  // Pagination Signals
  readonly itemsPerPage = signal(6);
  readonly currentPage = signal(1);

  // Sorting Signals
  readonly sortConfig = signal<{ key: string; direction: SortDirection }>({
    key: '',
    direction: 'none',
  });

  readonly sortedPatients = computed(() => {
    const patients = [...this.patients()];
    const config = this.sortConfig();

    if (config.direction === 'none' || !config.key) {
      return patients;
    }

    patients.sort((a, b) => {
      const valA = a[config.key as keyof Patient];
      const valB = b[config.key as keyof Patient];

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

    return patients;
  });

  readonly totalPages = computed(() => {
    return Math.ceil(this.sortedPatients().length / this.itemsPerPage());
  });

  readonly displayedPatients = computed(() => {
    const sorted = this.sortedPatients();
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
  readonly error = this.userFacade.error;
  private lastLoadedUserId: string | null = null;

  ngOnInit(): void {
    this.loadPatients();
  }

  async loadPatients(): Promise<void> {
    const currentUser = this.authFacade.user();
    if (!currentUser) return;

    if (
      this.userFacade.patients().length > 0 ||
      currentUser?.id === this.lastLoadedUserId
    ) {
      return;
    }

    this.loading.set(true);

    const minLoaderTimePromise = new Promise((resolve) =>
      setTimeout(resolve, 1800)
    );
    const dataFetchPromise = this.userFacade.loadPatientsForSpecialist(
      currentUser.id
    );

    try {
      await Promise.all([dataFetchPromise, minLoaderTimePromise]);
      this.lastLoadedUserId = currentUser?.id ?? null;
    } catch (error) {
      console.error(error);
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
