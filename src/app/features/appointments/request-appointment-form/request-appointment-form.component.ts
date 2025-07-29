import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { SvgIconComponent } from "../../../shared/icons/svg-icon.component";

interface Step {
  number: number;
  title: string;
}

@Component({
  selector: 'app-request-appointment-form',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './request-appointment-form.component.html',
  styleUrl: './request-appointment-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestAppointmentFormComponent {
  public steps: Step[] = [
    { number: 1, title: 'Elegir Especialidad' },
    { number: 2, title: 'Elegir Fecha y Hora' },
    { number: 3, title: 'Elegir Especialista' },
    { number: 4, title: 'Confirmar Turno' },
  ];

  public currentStep = signal<number>(1);

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