import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NEWS_DATA } from '../../data/news.data';
import { NewsPost } from '../../../../core/models/news-post.model';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-news-list-page',
  imports: [RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './news-list-page.component.html',
  styleUrl: './news-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListPageComponent {
  newsPosts: NewsPost[] = NEWS_DATA;
}