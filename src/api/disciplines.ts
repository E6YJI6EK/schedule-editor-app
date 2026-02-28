import { http } from './http'
import type { ApiSuccess, Discipline } from './types'

export async function searchDisciplines(params?: { name?: string }): Promise<ApiSuccess<Discipline[]>> {
  const res = await http.get<ApiSuccess<Discipline[]>>('/disciplines/search', { params })
  return res.data
}

