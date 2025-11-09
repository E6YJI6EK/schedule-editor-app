import type { LessonWithRelations } from '@/shared/api/lessons'
import type { Schedule, DaySchedule, ClassData } from '@/types/schedule'
import type { Day } from '@/shared/api/types'

// Маппинг дней из бэкенда в русские названия
const dayMap: Record<Day, string> = {
  mon: 'Понедельник',
  tue: 'Вторник',
  wed: 'Среда',
  thu: 'Четверг',
  fri: 'Пятница',
  sat: 'Суббота',
  sun: 'Воскресенье',
}

// Форматирование времени из day_partition
function formatTime(startTime: string, endTime: string): string {
  // Если время уже в формате HH:mm, используем его
  // Иначе пытаемся извлечь время из строки
  const start = startTime.length === 5 ? startTime : startTime.substring(11, 16)
  const end = endTime.length === 5 ? endTime : endTime.substring(11, 16)
  return `${start}–${end}`
}

/**
 * Преобразует данные уроков из бэкенда в формат расписания для одной недели
 */
export function transformLessonsToWeekSchedule(
  lessons: LessonWithRelations[],
  groupIds: number[]
): DaySchedule[] {
  // Получаем уникальные группы из уроков
  const groupsMap = new Map<number, string>()
  lessons.forEach(lesson => {
    if (lesson.group && !groupsMap.has(lesson.group.id)) {
      groupsMap.set(lesson.group.id, lesson.group.name)
    }
  })

  // Инициализируем дни недели
  const days: Day[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const weekSchedule: DaySchedule[] = days.map(day => ({
    day: dayMap[day],
    timeslots: [],
  }))

  // Группируем уроки по дню и времени
  const lessonsByDay: Record<string, Record<string, LessonWithRelations[]>> = {}

  lessons.forEach(lesson => {
    const day = lesson.time_slot.day
    const dayPartition = lesson.time_slot.day_partition
    
    if (!dayPartition) return

    const time = formatTime(dayPartition.start_time, dayPartition.end_time)

    if (!lessonsByDay[day]) {
      lessonsByDay[day] = {}
    }
    if (!lessonsByDay[day][time]) {
      lessonsByDay[day][time] = []
    }

    lessonsByDay[day][time].push(lesson)
  })

  // Заполняем расписание
  days.forEach(day => {
    const daySchedule = weekSchedule.find(d => d.day === dayMap[day])
    if (!daySchedule) return

    const dayLessons = lessonsByDay[day] || {}
    const times = Object.keys(dayLessons).sort()

    times.forEach(time => {
      const timeLessons = dayLessons[time]
      const classDataArray: ClassData[] = []

      // Создаем массив данных для каждой группы
      groupIds.forEach(groupId => {
        const lesson = timeLessons.find(l => l.group_id === groupId)
        
        if (lesson) {
          classDataArray.push({
            subject: lesson.discipline || null,
            teacher: lesson.teacher || null,
            room: lesson.class_room || null,
            building: lesson.class_room?.building || null,
          })
        } else {
          // Пустая ячейка для группы без урока
          classDataArray.push({
            subject: null,
            teacher: null,
            room: null,
            building: null,
          })
        }
      })

      daySchedule.timeslots.push({
        time,
        groups: classDataArray,
      })
    })
  })

  return weekSchedule
}

/**
 * Получает список групп из уроков
 */
export function getGroupsFromLessons(
  lessons: LessonWithRelations[],
  groupIds: number[]
): string[] {
  const groupsMap = new Map<number, string>()
  lessons.forEach(lesson => {
    if (lesson.group && !groupsMap.has(lesson.group.id)) {
      groupsMap.set(lesson.group.id, lesson.group.name)
    }
  })
  
  return groupIds
    .map(id => groupsMap.get(id))
    .filter((name): name is string => !!name)
}

