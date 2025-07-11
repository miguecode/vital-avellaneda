import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';

@Component({
  selector: 'app-panel-selector',
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './panel-selector.component.html',
  styleUrl: './panel-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelSelectorComponent {
  title: string = 'Ingresar al Portal de usuarios';
}
