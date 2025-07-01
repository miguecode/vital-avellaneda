import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Availability } from '../../../../core/models';

@Component({
  selector: 'app-availability-selector',
  imports: [],
  templateUrl: './availability-selector.component.html',
  styleUrl: './availability-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabilitySelectorComponent {
  @Input() selected: Availability[] = [];
  @Output() confirm = new EventEmitter<Availability[]>();
  @Output() cancel = new EventEmitter<void>();
}