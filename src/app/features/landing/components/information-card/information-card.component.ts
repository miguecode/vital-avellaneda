import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-card',
  imports: [],
  templateUrl: './information-card.component.html',
  styleUrl: './information-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full w-full' },
})
export class InformationCardComponent {
  @Input() title: string = '';
  @Input() border: string = '';
}
