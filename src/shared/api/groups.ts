import { http } from './http'
import type { ApiSuccess, Group, Course, EducationForm } from './types'

export async function searchGroups(params: {
  course: Course
  education_form: EducationForm
  institute_id: number
  discipline_id: number
  name?: string
}): Promise<ApiSuccess<Group[]>> {
  const res = await http.get<ApiSuccess<Group[]>>('/groups/search', { params })
  return res.data
}


