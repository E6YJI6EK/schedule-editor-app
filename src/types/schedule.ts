// Types for schedule data structure

import type {
  Building,
  ClassRoom,
  Discipline,
  Teacher,
} from "@/shared/api/types";

export interface ClassData {
  subject: Discipline | null;
  teacher: Teacher | null;
  room: ClassRoom | null;
  building: Building | null;
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

export type WeekType = "upperWeek" | "lowerWeek";
export type WeekTypeShort = "upper" | "lower";
