import { http } from './http'
import type { ApiSuccess, Building } from './types'

export async function searchBuildings(params?: { name?: string }): Promise<ApiSuccess<Building[]>> {
  const res = await http.get<ApiSuccess<Building[]>>('/buildings/search', { params })
  return res.data
}


