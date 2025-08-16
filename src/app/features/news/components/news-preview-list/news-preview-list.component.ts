import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  inject,
} from '@angular/core';
import { NewsFacade } from '../../news.facade';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";

@Component({
  selector: 'app-news-preview-list',
  imports: [RouterLink, DatePipe, TitleCasePipe, SvgIconComponent],
  templateUrl: './news-preview-list.component.html',
  styleUrl: './news-preview-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NewsPreviewListComponent {
  @Input() limit = 3;
  @Input() title = 'Otras noticias que podrían interesarte';
  @Input() currentNewsId: string | null = null;
  @Input() showTags: boolean = false;

  private readonly newsFacade = inject(NewsFacade);
  
  readonly newsPosts = computed(() => {
    const allNews = this.newsFacade.news();
    if (this.currentNewsId) {
      return allNews
        .filter((news) => news.id !== this.currentNewsId)
        .slice(0, this.limit);
    }
    return allNews.slice(0, this.limit);
  });
}