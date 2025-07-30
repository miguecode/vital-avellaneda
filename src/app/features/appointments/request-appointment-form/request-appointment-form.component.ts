import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SvgIconComponent } from '../../../shared/icons/svg-icon.component';
import { AppointmentSpecialtySelectorComponent } from '../appointment-specialty-selector/appointment-specialty-selector.component';
import { AppointmentSpecialistSelectorComponent } from '../appointment-specialist-selector/appointment-specialist-selector.component';
import { Specialist, Specialty } from '../../../core/models';

interface Step {
  number: number;
  title: string;
}

@Component({
  selector: 'app-request-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    AppointmentSpecialtySelectorComponent,
    AppointmentSpecialistSelectorComponent,
  ],
  templateUrl: './request-appointment-form.component.html',
  styleUrl: './request-appointment-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestAppointmentFormComponent {
  public steps: Step[] = [
    { number: 1, title: 'Elegir Especialidad' },
    { number: 2, title: 'Elegir Especialista' },
    { number: 3, title: 'Elegir Fecha y Hora' },
    { number: 4, title: 'Confirmar Turno' },
  ];

  public currentStep = signal<number>(1);
  readonly specialtySelected = signal<Specialty | null>(null);
  readonly specialistSelected = signal<Specialist | null>(null);

  public onSpecialtySelected(specialty: Specialty | null): void {
    this.specialtySelected.set(specialty);
  }
  public onSpecialistSelected(specialist: Specialist | null): void {
    this.specialistSelected.set(specialist);
  }

  public nextStep(): void {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.update((prev) => prev + 1);
    }
  }

  public prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((prev) => prev - 1);
    }
  }
}
