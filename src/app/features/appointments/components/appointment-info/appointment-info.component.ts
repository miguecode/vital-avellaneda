import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";
import { Appointment } from '../../../../core/models';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-info',
  imports: [SvgIconComponent, DatePipe, TitleCasePipe],
  templateUrl: './appointment-info.component.html',
  styleUrl: './appointment-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentInfoComponent {
  @Input({ required: true }) appointment!: Appointment;
}
