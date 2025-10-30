import { defineStore } from 'pinia'
import { searchTeachers } from '@/shared/api/teachers'
import type { Teacher } from '@/shared/api/types'

export const useTeachersStore = defineStore('teachers', {
  state: () => ({
    items: [] as Teacher[],
    loading: false,
    error: null as null | string,
  }),
  actions: {
    async search(params: { discipline_id: number; name?: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await searchTeachers(params)
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


