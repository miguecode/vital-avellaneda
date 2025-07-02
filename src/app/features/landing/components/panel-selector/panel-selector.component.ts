import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginIconComponent } from '../../../../shared/icons';

@Component({
  selector: 'app-panel-selector',
  imports: [LoginIconComponent],
  templateUrl: './panel-selector.component.html',
  styleUrl: './panel-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelSelectorComponent {
  title: string = 'Ingresar al Portal de usuarios';
}
