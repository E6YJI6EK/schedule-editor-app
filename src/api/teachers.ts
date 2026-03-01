import type { ApiSuccess } from '@/core/fetch-client/types';
import { http } from '@/core/fetch-client/http'
import type { Teacher } from './types'

export async function searchTeachers(params: { discipline_id: number; name?: string }): Promise<ApiSuccess<Teacher[]>> {
  const res = await http.get<ApiSuccess<Teacher[]>>('/teachers/search', { params })
  return res.data
}

