import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsFacade } from '../../news.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, TitleCasePipe, ViewportScroller } from '@angular/common';
import { NewsPreviewListComponent } from '../../components/news-preview-list/news-preview-list.component';
import { SeoService } from '../../../../shared/services/seo/seo.service';
import { SeoData } from '../../../../core/models/seo-data.model';

@Component({
  selector: 'app-news-detail-page',
  imports: [RouterLink, DatePipe, TitleCasePipe, NewsPreviewListComponent],
  templateUrl: './news-detail-page.component.html',
  styleUrl: './news-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsFacade = inject(NewsFacade);
  private viewportScroller = inject(ViewportScroller);
  private seoService = inject(SeoService);
  private elementRef = inject(ElementRef);

  private params = toSignal(this.route.paramMap);
  public newsPost = computed(() => {
    const id = this.params()?.get('id');
    if (!id) return undefined;

    this.viewportScroller.scrollToPosition([0, 0]);
    return this.newsFacade.getNewsById(id);
  });

  constructor() {
    effect(() => {
      if (this.params() && !this.newsPost()) {
        this.router.navigate(['/news']);
      }
    });

    effect(() => {
      const page = this.newsPost();
      if (page) {
        const seoData: SeoData = {
          title: page.title + ' | Vital Avellaneda',
          description: page.summary,
          keywords: page.title.split(' '),
          image: page.imageUrl,
          author: page.author,
        };
        this.seoService.setMeta(seoData);

        // Handle image loading animation
        setTimeout(() => {
          if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            const image: HTMLImageElement | null =
              this.elementRef.nativeElement.querySelector('.img-fade-in');
            if (image) {
              if (image.complete) {
                image.classList.add('is-loaded');
              } else {
                image.addEventListener('load', () => {
                  image.classList.add('is-loaded');
                }, { once: true });
              }
            }
          }
        });
      }
    });
  }

  getMobileImageUrl(url: string): string {
    const parts = url.split('.');
    const extension = parts.pop();
    const base = parts.join('.');
    return `${base}-mobile.${extension}`;
  }
}
