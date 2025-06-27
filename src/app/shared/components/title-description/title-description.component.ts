import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-description',
  imports: [],
  templateUrl: './title-description.component.html',
  styleUrl: './title-description.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleDescriptionComponent {
  @Input() title: string = 'Título';
  @Input() description: string = 'Texto de la descripción';
}
