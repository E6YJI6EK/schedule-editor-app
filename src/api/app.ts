import { http } from './http'
import type { ApiSuccess } from './types'

export async function getAlive(): Promise<ApiSuccess<string>> {
  const res = await http.get<ApiSuccess<string>>('/')
  return res.data
}

