import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PatientIconComponent,
  SpecialistIconComponent,
} from '../../../../icons';

@Component({
  selector: 'app-panel-selector',
  imports: [PatientIconComponent, SpecialistIconComponent],
  templateUrl: './panel-selector.component.html',
  styleUrl: './panel-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelSelectorComponent {}
