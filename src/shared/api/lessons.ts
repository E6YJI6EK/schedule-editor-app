import { http } from './http'
import type { ApiSuccess, Lesson, Teacher, ClassRoom, Building, TimeSlot, Discipline, Group, WeekType, EducationForm } from './types'

export async function createLesson(payload: {
  teacher_id: number
  class_room_id: number
  time_slot_id: number
  discipline_id: number
  group_id: number
}): Promise<ApiSuccess<Lesson>> {
  const res = await http.post<ApiSuccess<Lesson>>('/lessons/create', payload)
  return res.data
}

export async function updateLesson(
  id: number,
  payload: Partial<{
    teacher_id: number
    class_room_id: number
    time_slot_id: number
    discipline_id: number
    group_id: number
  }>
): Promise<ApiSuccess<Lesson>> {
  const res = await http.put<ApiSuccess<Lesson>>(`/lessons/update/${id}`, payload)
  return res.data
}

export type LessonWithRelations = {
  id: number;
  teacher: {
    id: number;
    name: string;
  };
  class_room: {
    id: number;
    number: string;
    building: {
      id: number;
      short_name: string;
    };
  };
  time_slot: {
    id: number;
    week_type: WeekType;
    day: number;
    day_partition: {
      id: number;
      start_time: string;
      end_time: string;
    };
  };
  discipline: {
    id: number;
    name: string;
  };
  group: {
    id: number;
    name: string;
    course: number;
    education_form: EducationForm;
    institute_id: number;
  };
};

export async function getSchedule(params: {
  group_ids: number[]
  is_upper_week: boolean
}): Promise<ApiSuccess<LessonWithRelations[]>> {
  const queryParams = new URLSearchParams()
  params.group_ids.forEach(id => queryParams.append('group_ids[]', id.toString()))
  queryParams.append('is_upper_week', params.is_upper_week ? '1' : '0')
  
  const res = await http.get<ApiSuccess<LessonWithRelations[]>>(`/lessons/schedule?${queryParams.toString()}`)
  return res.data
}

