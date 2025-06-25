import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PatientIconComponent } from "../../../../icons/patient-icon.component";
import { SpecialistIconComponent } from "../../../../icons/specialist-icon.component";

@Component({
  selector: 'app-panel-selector',
  imports: [PatientIconComponent, SpecialistIconComponent],
  templateUrl: './panel-selector.component.html',
  styleUrl: './panel-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelSelectorComponent {

}
