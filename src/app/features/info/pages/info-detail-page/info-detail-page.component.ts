import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoFacade } from '../../../info/info.facade';
import { ViewportScroller } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeoService } from '../../../../shared/services/seo/seo.service';
import { SeoData } from '../../../../core/models/seo-data.model';

@Component({
  selector: 'app-info-detail-page',
  imports: [],
  templateUrl: './info-detail-page.component.html',
  styleUrl: './info-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDetailPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private infoFacade = inject(InfoFacade);
  private viewportScroller = inject(ViewportScroller);
  private seoService = inject(SeoService);
  private elementRef = inject(ElementRef);

  private params = toSignal(this.route.paramMap);
  public infoPage = computed(() => {
    const slug = this.params()?.get('slug');
    if (!slug) return undefined;

    this.viewportScroller.scrollToPosition([0, 0]);
    return this.infoFacade.getInfoBySlug(slug);
  });

  constructor() {
    effect(() => {
      if (this.params() && !this.infoPage()) {
        this.router.navigate(['/info']);
      }
    });

    effect(() => {
      const page = this.infoPage();
      if (page) {
        const seoData: SeoData = {
          title: page.title + ' | Vital Avellaneda',
          description: page.subtitle,
          keywords: page.title.split(' '),
          image: page.imageUrl,
        };
        this.seoService.setMeta(seoData);
      }
    });

    effect(() => {
      // Handle image loading animation
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const image: HTMLImageElement | null =
            this.elementRef.nativeElement.querySelector('.img-fade-in');
          if (image) {
            if (image.complete) {
              image.classList.add('is-loaded');
            } else {
              image.addEventListener(
                'load',
                () => {
                  image.classList.add('is-loaded');
                },
                { once: true }
              );
            }
          }
        }
      });
    });
  }

  getMobileImageUrl(url: string): string {
    const parts = url.split('.');
    const extension = parts.pop();
    const base = parts.join('.');
    return `${base}-mobile.${extension}`;
  }
}
