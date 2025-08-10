import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Appointment } from '../../../../core/models/appointment.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';

@Component({
  selector: 'app-appointment-info',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './appointment-info.component.html',
  styleUrl: './appointment-info.component.css',
  providers: [DatePipe, TitleCasePipe],
})
export class AppointmentInfoComponent implements OnChanges {
  @Input({ required: true }) appointment!: Appointment;

  appointmentData: { label: string; value: string; statusClass?: string }[] =
    [];

  constructor(private datePipe: DatePipe, private titleCase: TitleCasePipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appointment'] && this.appointment) {
      this.buildAppointmentData();
    }
  }

  private buildAppointmentData(): void {
    const data: { label: string; value: string; statusClass?: string }[] = [];

    data.push({
      label: 'Fecha: ',
      value:
        this.datePipe.transform(this.appointment.date, 'd') +
          ' de ' +
          this.titleCase.transform(
            this.datePipe.transform(this.appointment.date, 'MMMM')
          ) +
          ' de ' +
          this.datePipe.transform(this.appointment.date, 'y') || '',
    });
    data.push({
      label: 'Horario: ',
      value:
        this.datePipe.transform(this.appointment.date, 'HH:mm') + ' hs.' || '',
    });
    data.push({
      label: 'Especialidad: ',
      value: this.appointment.specialty.name,
    });
    data.push({
      label: 'Especialista: ',
      value:
        this.appointment.specialistFirstName +
        ' ' +
        this.appointment.specialistLastName,
    });
    data.push({
      label: 'Paciente: ',
      value:
        this.appointment.patientFirstName +
        ' ' +
        this.appointment.patientLastName,
    });
    data.push({
      label: 'Fecha de Solicitud: ',
      value:
        this.datePipe.transform(this.appointment.creationDate, 'd') +
          ' de ' +
          this.titleCase.transform(
            this.datePipe.transform(this.appointment.creationDate, 'MMMM')
          ) +
          ' de ' +
          this.datePipe.transform(this.appointment.creationDate, 'y') || '',
    });

    // if (this.appointment.rating) {
    //   data.push({ label: 'Calificación', value: this.appointment.rating.comment! });
    // }

    this.appointmentData = data;
  }
}
