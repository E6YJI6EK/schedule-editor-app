import type { Schedule, DaySchedule, TimeSlot as ScheduleTimeSlot } from '@/types/schedule'
import type { Group } from '@/shared/api/types'

// Стандартные временные слоты
const DEFAULT_TIME_SLOTS = [
  '08:30–10:00',
  '10:10–11:40',
  '12:00–13:30',
  '13:40–15:10',
  '15:20–16:50',
  '17:00–18:30',
]

// Дни недели
const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

/**
 * Создает пустую структуру расписания для выбранных групп
 */
export function createEmptySchedule(groups: Group[]): Schedule {
  const groupNames = groups.map(g => g.name)

  // Создаем пустую структуру для одной недели
  const createEmptyWeek = (): DaySchedule[] => {
    return DAYS.map(day => {
      const timeslots: ScheduleTimeSlot[] = DEFAULT_TIME_SLOTS.map(time => {
        const groupsData = groupNames.map(() => ({
          subject: null,
          teacher: null,
          room: null,
          building: null,
        }))

        return {
          time,
          groups: groupsData,
        }
      })

      return {
        day,
        timeslots,
      }
    })
  }

  return {
    groups: groupNames,
    upperWeek: createEmptyWeek(),
    lowerWeek: createEmptyWeek(),
  }
}

