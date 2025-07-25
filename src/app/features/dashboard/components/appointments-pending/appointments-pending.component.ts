import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';

@Component({
  selector: 'app-appointments-pending',
  imports: [SvgIconComponent],
  templateUrl: './appointments-pending.component.html',
  styleUrl: './appointments-pending.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsPendingComponent {}
