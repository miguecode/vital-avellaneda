import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Specialty } from '../../../../core/models';
import { CloseIconComponent } from "../../../../icons/close-icon.component";

@Component({
  selector: 'app-specialty-selector',
  imports: [CloseIconComponent],
  templateUrl: './specialty-selector.component.html',
  styleUrl: './specialty-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtySelectorComponent {
  @Input() selected: Specialty[] = [];
  @Input() selectedString: string[] = [];
  @Output() confirm = new EventEmitter<Specialty[]>();
  @Output() cancel = new EventEmitter<void>();

  specialties = [
    'Alergología',
    'Cardiología',
    'Clínica Médica',
    'Dermatología',
    'Endocrinología',
    'Fisiatría',
    'Gastroenterología',
    'Ginecología',
    'Infectología',
    'Kinesiología',
    'Nefrología',
    'Neumonología',
    'Neurología',
    'Nutrición',
    'Odontología',
    'Oftalmología',
    'Oncología',
    'Otorrinolaringología',
    'Pediatría',
    'Psicología',
    'Psiquiatría',
    'Reumatología',
    'Traumatología',
    'Urología',
  ];

  toggleSelected(specialty: string) {
    const index = this.selectedString.indexOf(specialty);
  
    if (index === -1) {
      this.selectedString.push(specialty);
    } else {
      this.selectedString.splice(index, 1);
    }
  }
  
  exit(): void {
    // Salir sin guardar los cambios
  }
}
