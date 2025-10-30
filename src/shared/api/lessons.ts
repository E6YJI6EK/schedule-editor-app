import { http } from './http'
import type { ApiSuccess, Lesson } from './types'

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


