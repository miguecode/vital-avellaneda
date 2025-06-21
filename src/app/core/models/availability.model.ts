export interface Availability {
  day: WeekDay;
  startTime: string;
  endTime: string;
}
export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
