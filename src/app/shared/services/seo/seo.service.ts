import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../../../core/models/seo-data.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setMeta(page: SeoData): void {
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });

    if (page.author) {
      this.meta.updateTag({ name: 'author', content: page.author });
    } else {
      this.meta.removeTag("name='author'");
    }

    if (page.keywords && page.keywords.length > 0) {
      this.meta.updateTag({
        name: 'keywords',
        content: page.keywords.join(', '),
      });
    } else {
      this.meta.removeTag("name='keywords'");
    }

    // OG
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({
      property: 'og:description',
      content: page.description,
    });
    if (page.image) {
      this.meta.updateTag({ property: 'og:image', content: page.image });
    }
    if (isPlatformBrowser(this.platformId)) {
      this.meta.updateTag({ property: 'og:url', content: window.location.href });
    }
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: page.description,
    });
    if (page.image) {
      this.meta.updateTag({ name: 'twitter:image', content: page.image });
    }
  }
}
