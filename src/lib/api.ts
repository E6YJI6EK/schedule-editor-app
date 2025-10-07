import type { ScheduleResponse, LessonItem, WeekType } from '@/pages/SchedulePage/model/types'

// In-memory mock DB
let lessonsDb: LessonItem[] = [
  {
    id: '1',
    week: 'odd',
    dayOfWeek: 1,
    timeSlotLabel: '08:30–10:00',
    teacherFullName: 'Иванов И.И.',
    groupCode: 'ИВТ-101',
    subjectTitle: 'Математика',
    roomNumber: '101',
    buildingNumber: '1',
  },
  {
    id: '2',
    week: 'even',
    dayOfWeek: 3,
    timeSlotLabel: '10:10–11:40',
    teacherFullName: 'Петров П.П.',
    groupCode: 'ИВТ-102',
    subjectTitle: 'Физика',
    roomNumber: '205',
    buildingNumber: '2',
  },
]

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export async function fetchSchedule(params?: { week?: WeekType }): Promise<ScheduleResponse> {
  const filtered = params?.week ? lessonsDb.filter(l => l.week === params.week) : lessonsDb
  return delay({ lessons: filtered })
}

export async function createLesson(payload: Omit<LessonItem, 'id'>): Promise<LessonItem> {
  const newItem: LessonItem = { id: crypto.randomUUID(), ...payload }
  lessonsDb.push(newItem)
  return delay(newItem)
}

export async function updateLesson(id: string, payload: Partial<LessonItem>): Promise<LessonItem> {
  const idx = lessonsDb.findIndex(l => l.id === id)
  if (idx === -1) throw new Error('Lesson not found')
  const merged: LessonItem = { ...lessonsDb[idx], ...payload, id } as LessonItem
  lessonsDb[idx] = merged
  return delay(merged)
}

export async function deleteLesson(id: string): Promise<void> {
  lessonsDb = lessonsDb.filter(l => l.id !== id)
  return delay(undefined)
}


