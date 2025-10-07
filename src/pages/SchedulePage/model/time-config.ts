import type { TimeSlot } from './types'

export const DAYS: { key: number; label: string }[] = [
  { key: 1, label: 'Пн' },
  { key: 2, label: 'Вт' },
  { key: 3, label: 'Ср' },
  { key: 4, label: 'Чт' },
  { key: 5, label: 'Пт' },
  { key: 6, label: 'Сб' },
]

export const TIME_SLOTS: TimeSlot[] = [
  { startMinutes: 8 * 60 + 30, endMinutes: 10 * 60 + 0, label: '08:30–10:00' },
  { startMinutes: 10 * 60 + 10, endMinutes: 11 * 60 + 40, label: '10:10–11:40' },
  { startMinutes: 11 * 60 + 50, endMinutes: 13 * 60 + 20, label: '11:50–13:20' },
  { startMinutes: 13 * 60 + 40, endMinutes: 15 * 60 + 10, label: '13:40–15:10' },
  { startMinutes: 15 * 60 + 20, endMinutes: 16 * 60 + 50, label: '15:20–16:50' },
  { startMinutes: 17 * 60 + 0, endMinutes: 18 * 60 + 30, label: '17:00–18:30' },
]


