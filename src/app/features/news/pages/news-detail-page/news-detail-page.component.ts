import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsFacade } from '../../news.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, TitleCasePipe, ViewportScroller } from '@angular/common';
import { NewsPreviewListComponent } from '../../components/news-preview-list/news-preview-list.component';

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
  }
}