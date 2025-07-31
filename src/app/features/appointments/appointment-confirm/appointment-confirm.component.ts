import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgIconComponent } from '../../../shared/icons/svg-icon.component';
import { Specialist, Specialty } from '../../../core/models';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-confirm',
  imports: [SvgIconComponent, DatePipe, TitleCasePipe],
  templateUrl: './appointment-confirm.component.html',
  styleUrl: './appointment-confirm.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentConfirmComponent {
  @Input({ required: true }) specialty!: Specialty | null;
  @Input({ required: true }) specialist!: Specialist | null;
  @Input({ required: true }) dateTime!: Date | null;
}
