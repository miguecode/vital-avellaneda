export interface Availability {
  day: WeekDay;
  intervals: TimeInterval[];
}

export interface TimeInterval {
  start: string;
  end: string;
}

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
