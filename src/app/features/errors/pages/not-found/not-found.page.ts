import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
