import { Injectable, signal } from '@angular/core';
import { INFO_PAGES_DATA } from './data/info.data';
import { InfoPage } from '../../core/models/info-page.model';

@Injectable({
  providedIn: 'root',
})
export class InfoFacade {
  private readonly _news = signal<InfoPage[]>(INFO_PAGES_DATA);
  public readonly news = this._news.asReadonly();

  public getInfoBySlug(slug: string): InfoPage | undefined {
    const infoPage = this.news().find((page) => page.slug === slug);
    return infoPage;
  }
}