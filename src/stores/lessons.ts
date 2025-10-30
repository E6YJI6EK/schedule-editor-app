import { defineStore } from 'pinia'
import { createLesson, updateLesson } from '@/shared/api/lessons'
import type { Lesson } from '@/shared/api/types'

export const useLessonsStore = defineStore('lessons', {
  state: () => ({
    lastCreated: null as Lesson | null,
    loading: false,
    error: null as null | string,
  }),
  actions: {
    async create(payload: { teacher_id: number; class_room_id: number; time_slot_id: number; discipline_id: number; group_id: number }) {
      this.loading = true
      this.error = null
      try {
        const res = await createLesson(payload)
        this.lastCreated = (res as any).data ?? null
        return this.lastCreated
      } catch (e: any) {
        this.error = e?.message ?? 'Ошибка'
        throw e
      } finally {
        this.loading = false
      }
    },
    async update(id: number, payload: Partial<{ teacher_id: number; class_room_id: number; time_slot_id: number; discipline_id: number; group_id: number }>) {
      this.loading = true
      this.error = null
      try {
        const res = await updateLesson(id, payload)
        return (res as any).data
      } catch (e: any) {
        this.error = e?.message ?? 'Ошибка'
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})


