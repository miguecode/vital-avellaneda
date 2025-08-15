import { Injectable, signal } from '@angular/core';
import { NEWS_DATA } from './data/news.data';
import { NewsPost } from '../../core/models/news-post.model';

@Injectable({
  providedIn: 'root',
})
export class NewsFacade {
  private readonly _news = signal<NewsPost[]>(NEWS_DATA);
  public readonly news = this._news.asReadonly();

  public getNewsById(id: string): NewsPost | undefined {
    const newsPost = this.news().find((post) => post.id === id);
    return newsPost;
  }
}