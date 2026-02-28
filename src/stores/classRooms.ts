import { defineStore } from 'pinia'
import { searchClassRooms } from '@/api/classRooms'
import type { ClassRoom } from '@/api/types'

export const useClassRoomsStore = defineStore('classRooms', {
  state: () => ({ items: [] as ClassRoom[], loading: false, error: null as null | string }),
  actions: {
    async search(params: { building_id: number; number?: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await searchClassRooms(params)
        this.items = (res as any).data ?? []
      } catch (e: any) {
        this.error = e?.message ?? 'Ошибка'
        this.items = []
      } finally {
        this.loading = false
      }
    },
  },
})


