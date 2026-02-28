import { http } from './http'
import type { ApiSuccess, ClassRoom } from './types'

export async function searchClassRooms(params: { building_id: number; number?: string }): Promise<ApiSuccess<ClassRoom[]>> {
  const res = await http.get<ApiSuccess<ClassRoom[]>>('/class-rooms/search', { params })
  return res.data
}

