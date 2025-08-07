import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, signal, Signal } from '@angular/core';
import { Specialty } from '../../../../core/models';
import { SpecialtyFacade } from '../../../specialties/specialty.facade';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";

@Component({
  selector: 'app-appointment-specialty-selector',
  imports: [SvgIconComponent],
  templateUrl: './appointment-specialty-selector.component.html',
  styleUrl: './appointment-specialty-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentSpecialtySelectorComponent implements OnInit {
  @Input() lastSelected: Specialty | null = null;
  @Output() specialtyEmitted = new EventEmitter<Specialty | null>();
  
  private readonly specialtyFacade = inject(SpecialtyFacade);

  readonly specialties: Signal<Specialty[]> = this.specialtyFacade.specialties;
  readonly selectedSpecialty = signal<Specialty | null>(null);

  ngOnInit(): void {
    this.selectedSpecialty.set(this.lastSelected);
    this.specialtyFacade.loadSpecialties();
  }

  selectSpecialty(specialty: Specialty): void {
    const current = this.selectedSpecialty();
    if (current && current.id === specialty.id) {
      this.selectedSpecialty.set(null);
    } else {
      this.selectedSpecialty.set(specialty);
    }

    this.specialtyEmitted.emit(this.selectedSpecialty());
  }

  isSelected(specialty: Specialty): boolean {
    const current = this.selectedSpecialty();
    return current ? current.id === specialty.id : false;
  }
}