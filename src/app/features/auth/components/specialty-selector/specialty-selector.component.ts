import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  Signal,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Specialty } from '../../../../core/models';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { SpecialtyFacade } from '../../../specialties/specialty.facade';

@Component({
  selector: 'app-specialty-selector',
  imports: [SvgIconComponent],
  templateUrl: './specialty-selector.component.html',
  styleUrl: './specialty-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtySelectorComponent implements OnInit, OnChanges {
  @Input() lastSelected: Specialty[] = [];
  @Output() confirm = new EventEmitter<Specialty[]>();
  @Output() cancel = new EventEmitter<void>();

  // Inject the facade of SpecialtyService
  private readonly specialtyFacade = inject(SpecialtyFacade);

  // Get the entire list of specialties from the Database
  readonly specialties: Signal<Specialty[]> = this.specialtyFacade.specialties;

  // Signal of selected specialties array
  readonly selectedSpecialties = signal<Specialty[]>([...this.lastSelected]);

  ngOnInit(): void {
    // Load the list of specialties from the Database
    this.specialtyFacade.loadSpecialties();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Set the last selected specialties to the current array (the Signal)
    if (changes['lastSelected']) {
      this.selectedSpecialties.set([...this.lastSelected]);
    }
  }

  // Add or remove the specialty from the selected specialties array (the Signal)
  toggleSelected(specialty: Specialty): void {
    const current = this.selectedSpecialties();
    const exists = current.find((s) => s.id === specialty.id);

    if (exists) {
      this.selectedSpecialties.set(
        current.filter((s) => s.id !== specialty.id)
      );
    } else {
      this.selectedSpecialties.set([...current, specialty]);
    }
  }

  // Return true or false if the specialty is already selected
  isSelected(specialty: Specialty): boolean {
    return !!this.selectedSpecialties().find((s) => s.id === specialty.id);
  }

  // Emit resolve
  save(): void {
    this.confirm.emit(this.selectedSpecialties());
  }
  exit(): void {
    this.cancel.emit();
  }
}
