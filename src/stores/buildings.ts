import { defineStore } from 'pinia'
import { searchBuildings } from '@/api/buildings'
import type { Building } from '@/api/types'

export const useBuildingsStore = defineStore('buildings', {
  state: () => ({ items: [] as Building[], loading: false, error: null as null | string }),
  actions: {
    async search(params?: { name?: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await searchBuildings(params)
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


