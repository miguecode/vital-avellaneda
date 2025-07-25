import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-news-cards',
  imports: [NgStyle],
  templateUrl: './news-cards.component.html',
  styleUrl: './news-cards.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardsComponent {
  srcImage: string = 'images/login.webp';
}
