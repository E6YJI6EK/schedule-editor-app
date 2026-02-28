export type ApiSuccess<T> = {
  success: true
  message?: string
  data: T
  status?: number
}

export type ApiError = {
  success: false
  message: string
  status: number
  errors?: Record<string, string[]>
}

export type Id = number

export type Teacher = { id: Id; name: string; discipline_id: Id }
export type Discipline = { id: Id; name: string }
export type Building = { id: Id; name: string }
export type ClassRoom = { id: Id; number: string; building_id: Id }
export type Institute = { id: Id; name: string }
export type Group = {
  id: Id
  name: string
  course: Course
  education_form: EducationForm
  institute_id: Id
  discipline_id: Id
}

export type TimeSlot = { id: Id; starts_at: string; ends_at: string; day: Day; week_type: WeekType }

export type Lesson = {
  id: Id
  teacher_id: Id
  class_room_id: Id
  time_slot_id: Id
  discipline_id: Id
  group_id: Id
}

export enum Course {
  First = 1,
  Second = 2,
  Third = 3,
  Fourth = 4,
  Fifth = 5,
  Sixth = 6,
}

export enum EducationForm {
  FullTime = 'full_time',
  PartTime = 'part_time',
  Evening = 'evening',
}

export enum WeekType {
  Upper = 'upper',
  Lower = 'lower',
}

export enum Day {
  Mon = 'mon',
  Tue = 'tue',
  Wed = 'wed',
  Thu = 'thu',
  Fri = 'fri',
  Sat = 'sat',
  Sun = 'sun',
}

