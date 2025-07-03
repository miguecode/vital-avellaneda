import { AvailabilityPreset } from '../models/availability.model';

export const AVAILABILITY_PRESETS: AvailabilityPreset[] = [
  {
    name: 'full-time-morning',
    value: [
      { day: 'monday', intervals: [{ start: '08:00', end: '14:00' }] },
      { day: 'tuesday', intervals: [{ start: '08:00', end: '14:00' }] },
      { day: 'wednesday', intervals: [{ start: '08:00', end: '14:00' }] },
      { day: 'thursday', intervals: [{ start: '08:00', end: '14:00' }] },
      { day: 'friday', intervals: [{ start: '08:00', end: '14:00' }] },
    ],
  },
  {
    name: 'full-time-afternoon',
    value: [
      { day: 'monday', intervals: [{ start: '14:00', end: '20:00' }] },
      { day: 'tuesday', intervals: [{ start: '14:00', end: '20:00' }] },
      { day: 'wednesday', intervals: [{ start: '14:00', end: '20:00' }] },
      { day: 'thursday', intervals: [{ start: '14:00', end: '20:00' }] },
      { day: 'friday', intervals: [{ start: '14:00', end: '20:00' }] },
    ],
  },
  {
    name: 'part-time-morning',
    value: [
      { day: 'monday', intervals: [{ start: '08:00', end: '12:00' }] },
      { day: 'wednesday', intervals: [{ start: '08:00', end: '12:00' }] },
      { day: 'friday', intervals: [{ start: '08:00', end: '12:00' }] },
    ],
  },
  {
    name: 'part-time-afternoon',
    value: [
      { day: 'tuesday', intervals: [{ start: '16:00', end: '20:00' }] },
      { day: 'thursday', intervals: [{ start: '16:00', end: '20:00' }] },
    ],
  },
  {
    name: 'saturdays-only-morning',
    value: [
      { day: 'saturday', intervals: [{ start: '09:00', end: '13:00' }] },
    ],
  },
  {
    name: 'monday-wednesday-friday-morning',
    value: [
      { day: 'monday', intervals: [{ start: '09:00', end: '13:00' }] },
      { day: 'wednesday', intervals: [{ start: '09:00', end: '13:00' }] },
      { day: 'friday', intervals: [{ start: '09:00', end: '13:00' }] },
    ],
  },
  {
    name: 'tuesday-thursday-afternoon',
    value: [
      { day: 'tuesday', intervals: [{ start: '14:00', end: '18:00' }] },
      { day: 'thursday', intervals: [{ start: '14:00', end: '18:00' }] },
    ],
  },
];


export const AVAILABILITY_PRESETS_OPTIONS = AVAILABILITY_PRESETS.map(p => p.name);

export const AVAILABILITY_PRESETS_LABELS = new Map<AvailabilityPreset['name'], string>([
  ['full-time-morning', 'Tiempo completo (mañana)'],
  ['full-time-afternoon', 'Tiempo completo (tarde)'],
  ['part-time-morning', 'Medio tiempo (mañana)'],
  ['part-time-afternoon', 'Medio tiempo (tarde)'],
  ['saturdays-only-morning', 'Sólo los sábados (mañana)'],
  ['monday-wednesday-friday-morning', 'Lunes, miércoles y viernes (mañana)'],
  ['tuesday-thursday-afternoon', 'Martes y jueves (tarde)'],
]);