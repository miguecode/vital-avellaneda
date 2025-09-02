import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { NewsFacade } from '../../news.facade';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe, NgClass } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';

@Component({
  selector: 'app-news-preview-list',
  imports: [RouterLink, DatePipe, TitleCasePipe, SvgIconComponent, NgClass],
  templateUrl: './news-preview-list.component.html',
  styleUrl: './news-preview-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPreviewListComponent {
  limit = input(4);
  title = input('Otras noticias que podrían interesarte');
  currentNewsId = input<string | null>(null);
  showTags = input(false);
  secondHeader = input(false);

  private readonly newsFacade = inject(NewsFacade);
  private readonly elementRef = inject(ElementRef);

  constructor() {
    // Effect to handle image loading animations
    effect(() => {
      this.newsPosts(); // Depend on this signal

      // Defer to the next microtask to allow the DOM to update
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const images: NodeListOf<HTMLImageElement> =
            this.elementRef.nativeElement.querySelectorAll('.img-fade-in');
          images.forEach((img) => {
            if (img.complete) {
              img.classList.add('is-loaded');
            } else {
              img.addEventListener('load', () => {
                img.classList.add('is-loaded');
              }, { once: true });
            }
          });
        }
      });
    });
  }

  readonly newsPosts = computed(() => {
    const allNews = this.newsFacade.news();
    const currentId = this.currentNewsId();
    if (currentId) {
      return allNews
        .filter((news) => news.id !== currentId)
        .slice(0, this.limit());
    }
    return allNews.slice(0, this.limit());
  });

  getMobileImageUrl(url: string): string {
    const parts = url.split('.');
    const extension = parts.pop();
    const base = parts.join('.');
    return `${base}-mobile.${extension}`;
  }
}
