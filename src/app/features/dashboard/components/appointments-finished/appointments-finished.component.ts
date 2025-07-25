import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";

@Component({
  selector: 'app-appointments-finished',
  imports: [SvgIconComponent],
  templateUrl: './appointments-finished.component.html',
  styleUrl: './appointments-finished.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsFinishedComponent {

}
