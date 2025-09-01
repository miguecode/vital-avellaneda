import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { NEWS_DATA } from '../../data/news.data';
import { NewsPost } from '../../../../core/models/news-post.model';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { SeoService } from '../../../../shared/services/seo/seo.service';
import { SeoData } from '../../../../core/models/seo-data.model';

@Component({
  selector: 'app-news-list-page',
  imports: [RouterLink, DatePipe, TitleCasePipe, SvgIconComponent],
  templateUrl: './news-list-page.component.html',
  styleUrl: './news-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListPageComponent {
  seoService = inject(SeoService);

  constructor() {
    effect(() => {
      const newsMeta: SeoData = {
        title: 'Novedades y Artículos | Vital Avellaneda',
        description: 'Mantenete informado sobre las últimas noticias de nuestra clínica, consejos de salud, nuevos servicios y campañas de prevención. Cuidamos de vos y los tuyos.',
        keywords: ['noticias de salud', 'consejos médicos', 'novedades', 'prevención', 'campañas de salud'],
        author: 'Vital Avellaneda',
        image: 'https://res.cloudinary.com/dsd1komi4/image/upload/v1756509770/logo-big_jsy8qr.jpg',
      };
      this.seoService.setMeta(newsMeta);
    });
  }

  newsPosts: NewsPost[] = NEWS_DATA;

  // Pagination Signals
  readonly itemsPerPage = signal(9);
  readonly currentPage = signal(1);

  readonly totalPages = computed(() => {
    return Math.ceil(this.newsPosts.length / this.itemsPerPage());
  });

  readonly displayedNewsPosts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.newsPosts.slice(startIndex, endIndex);
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
