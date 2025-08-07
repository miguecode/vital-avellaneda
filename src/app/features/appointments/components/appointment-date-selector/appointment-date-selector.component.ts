import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  effect,
  signal,
} from '@angular/core';
import { Specialist, TimeInterval } from '../../../../core/models';
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  WEEKDAYS_ORDERED,
} from '../../../../core/constants/weekdays-map';

@Component({
  selector: 'app-appointment-date-selector',
  imports: [],
  templateUrl: './appointment-date-selector.component.html',
  styleUrl: './appointment-date-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentDateSelectorComponent {
  @Input({ required: true }) specialist!: Specialist | null;
  @Input() lastSelected: Date | null = null;
  @Output() dateTimeSelected = new EventEmitter<Date | null>();

  readonly availableDays = signal<Date[]>([]);
  readonly availableTimes = signal<string[]>([]);
  readonly selectedDay = signal<Date | null>(null);
  readonly selectedTime = signal<string | null>(null);

  readonly isDateSelected = computed<boolean>(
    () => !!this.selectedDay() && !!this.selectedTime()
  );

  constructor() {
    effect(() => {
      this._calculateAvailableDays();
    });

    effect(() => {
      if (this.isDateSelected()) {
        const day = this.selectedDay()!;
        const time = this.selectedTime()!;

        const [hours, minutes] = time.split(':').map(Number);
        const finalDate = new Date(day);
        finalDate.setHours(hours, minutes);
        this.dateTimeSelected.emit(finalDate);
      } else {
        this.dateTimeSelected.emit(null);
      }
    });

    // Effect to handle pre-selection from `lastSelected` input
    effect(() => {
      const lastSelectedDate = this.lastSelected;
      // Ensure we have available days calculated before trying to pre-select
      // Only pre-select if no day has been selected yet by the user.
      // This breaks the cycle where this effect would override user selections.
      if (
        lastSelectedDate &&
        !this.selectedDay() &&
        this.availableDays().length > 0
      ) {
        this.preselectDateTime(lastSelectedDate);
      }
    });
  }

  private _calculateAvailableDays(): void {
    if (!this.specialist) {
      this.availableDays.set([]);
      return;
    }

    const days: Date[] = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      date.setHours(0, 0, 0, 0);

      const dayName = WEEKDAYS_ORDERED[date.getDay()];
      const specialistAvailability = this.specialist.availability.find(
        (a) => a.day === dayName
      );

      if (
        specialistAvailability &&
        specialistAvailability.intervals.length > 0
      ) {
        days.push(date);
      }
    }
    this.availableDays.set(days);
    this.availableTimes.set([]);
    this.selectedDay.set(null);
    this.selectedTime.set(null);
  }

  private preselectDateTime(date: Date): void {
    // Find the day object from our `availableDays` array that matches the date.
    // We can't just use the `date` object directly because it won't be
    // referentially equal.
    const dayToSelect = this.availableDays().find(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );

    if (dayToSelect) {
      // This will set the selected day and generate the available times
      this.onDaySelected(dayToSelect);

      const timeToSelect = `${String(date.getHours()).padStart(
        2,
        '0'
      )}:${String(date.getMinutes()).padStart(2, '0')}`;
      if (this.availableTimes().includes(timeToSelect)) {
        this.onTimeSelected(timeToSelect);
      }
    }
  }

  public onDaySelected(day: Date): void {
    // Compare by value (.getTime()) instead of reference (===) to be more robust.
    if (this.selectedDay()?.getTime() === day.getTime()) return;

    this.selectedDay.set(day);
    this.selectedTime.set(null);

    const dayName = WEEKDAYS_ORDERED[day.getDay()];
    const availabilityForDay = this.specialist?.availability.find(
      (a) => a.day === dayName
    );

    if (availabilityForDay) {
      const slots = this._generateTimeSlots(availabilityForDay.intervals);
      this.availableTimes.set(slots);
    } else {
      this.availableTimes.set([]);
    }
  }

  public onTimeSelected(time: string): void {
    this.selectedTime.set(time);
  }

  public getDayDisplay(date: Date): {
    dayName: string;
    dayNumber: number;
    monthName: string;
  } {
    const dayName = WEEKDAY_LABELS[WEEKDAYS_ORDERED[date.getDay()]];
    const monthName = MONTH_LABELS[date.getMonth()];
    return { dayName, dayNumber: date.getDate(), monthName };
  }

  private _generateTimeSlots(intervals: TimeInterval[]): string[] {
    const slots: string[] = [];
    const slotDurationMinutes = 60;

    for (const interval of intervals) {
      const [startHour, startMinute] = interval.start.split(':').map(Number);
      const [endHour, endMinute] = interval.end.split(':').map(Number);

      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute < endMinute)
      ) {
        slots.push(
          `${String(currentHour).padStart(2, '0')}:${String(
            currentMinute
          ).padStart(2, '0')}`
        );

        currentMinute += slotDurationMinutes;
        if (currentMinute >= 60) {
          currentHour += Math.floor(currentMinute / 60);
          currentMinute %= 60;
        }
      }
    }
    return slots;
  }
}
