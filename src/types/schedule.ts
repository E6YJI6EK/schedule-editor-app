// Types for schedule data structure

export interface ClassData {
  subject: string;
  teacher: string;
  room: string;
  building: string;
}

export interface TimeSlot {
  time: string;
  groups: ClassData[];
}

export interface DaySchedule {
  day: string;
  timeslots: TimeSlot[];
}

export interface Schedule {
  groups: string[];
  upperWeek: DaySchedule[];
  lowerWeek: DaySchedule[];
}

export interface RoomColors {
  [key: string]: string;
}

export type WeekType = 'upperWeek' | 'lowerWeek';
export type WeekTypeShort = 'upper' | 'lower';

