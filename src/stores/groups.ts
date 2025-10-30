import { defineStore } from 'pinia'
import { searchGroups } from '@/shared/api/groups'
import type { Group, Course, EducationForm } from '@/shared/api/types'

export const useGroupsStore = defineStore('groups', {
  state: () => ({ items: [] as Group[], loading: false, error: null as null | string }),
  actions: {
    async search(params: { course: Course; education_form: EducationForm; institute_id: number; discipline_id: number; name?: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await searchGroups(params)
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


