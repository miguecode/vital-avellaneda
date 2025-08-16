import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsFacade } from '../../news.facade';
import { NewsPost } from '../../../../core/models/news-post.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { NewsPreviewListComponent } from '../../components/news-preview-list/news-preview-list.component';

@Component({
  selector: 'app-news-detail-page',
  imports: [RouterLink, DatePipe, TitleCasePipe, NewsPreviewListComponent],
  templateUrl: './news-detail-page.component.html',
  styleUrl: './news-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsFacade = inject(NewsFacade);

  public newsPost: NewsPost | undefined;

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/news']);
      return;
    }

    this.newsPost = this.newsFacade.getNewsById(id);

    if (!this.newsPost) {
      this.router.navigate(['/news']);
      return;
    }
  }
}