import { defineStore } from 'pinia'
import { searchDisciplines } from '@/shared/api/disciplines'
import type { Discipline } from '@/shared/api/types'

export const useDisciplinesStore = defineStore('disciplines', {
  state: () => ({ items: [] as Discipline[], loading: false, error: null as null | string }),
  actions: {
    async search(params?: { name?: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await searchDisciplines(params)
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


