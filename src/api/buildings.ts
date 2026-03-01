import type { ApiSuccess } from '@/core/fetch-client/types'
import { http } from '@/core/fetch-client/http'
import type { Building } from './types'

export async function searchBuildings(params?: { name?: string }): Promise<ApiSuccess<Building[]>> {
  const res = await http.get<ApiSuccess<Building[]>>('/buildings/search', { params })
  return res.data
}

