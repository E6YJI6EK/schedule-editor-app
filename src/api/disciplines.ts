import type { ApiSuccess } from '@/core/fetch-client/types'
import { http } from '@/core/fetch-client/http'
import type { Discipline } from './types'

export async function searchDisciplines(params?: { name?: string }): Promise<ApiSuccess<Discipline[]>> {
  const res = await http.get<ApiSuccess<Discipline[]>>('/disciplines/search', { params })
  return res.data
}

