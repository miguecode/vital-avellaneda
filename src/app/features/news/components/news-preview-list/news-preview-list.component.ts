import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
}
