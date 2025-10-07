export type WeekType = 'odd' | 'even'

export interface TimeSlot {
  startMinutes: number // minutes from 00:00
  endMinutes: number
  label: string
}

export interface LessonItem {
  id: string
  week: WeekType
  dayOfWeek: number // 1=Mon ... 7=Sun
  timeSlotLabel: string
  teacherFullName: string
  groupCode: string
  subjectTitle: string
  roomNumber: string
  buildingNumber: string
}

export interface ScheduleResponse {
  lessons: LessonItem[]
}


