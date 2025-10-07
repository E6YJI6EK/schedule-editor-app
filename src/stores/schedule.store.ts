import { defineStore } from 'pinia'
import { fetchSchedule, createLesson, updateLesson, deleteLesson } from '@/lib/api'
import type { LessonItem, WeekType } from '@/pages/SchedulePage/model/types'

interface State {
  currentWeek: WeekType
  lessons: LessonItem[]
  loading: boolean
  error: string | null
}

export const useScheduleStore = defineStore('schedule', {
  state: (): State => ({
    currentWeek: 'odd',
    lessons: [],
    loading: false,
    error: null,
  }),
  getters: {
    lessonsByWeek: (state) => (week: WeekType) => state.lessons.filter((l: LessonItem) => l.week === week),
    lessonsMap(state) {
      const map = new Map<string, LessonItem[]>()
      for (const l of state.lessons as LessonItem[]) {
        const key = `${l.week}-${l.dayOfWeek}-${l.timeSlotLabel}`
        const arr = map.get(key) || []
        arr.push(l)
        map.set(key, arr)
      }
      return map
    },
  },
  actions: {
    setWeek(week: WeekType) {
      this.currentWeek = week
    },
    async load(week?: WeekType) {
      this.loading = true
      this.error = null
      try {
        const data = await fetchSchedule({ week })
        this.lessons = data.lessons
      } catch (e: any) {
        this.error = e?.message || 'Failed to load schedule'
      } finally {
        this.loading = false
      }
    },
    async addLesson(payload: Omit<LessonItem, 'id'>) {
      const created = await createLesson(payload)
      this.lessons.push(created)
    },
    async editLesson(id: string, patch: Partial<LessonItem>) {
      const updated = await updateLesson(id, patch)
      const idx = this.lessons.findIndex(l => l.id === id)
      if (idx !== -1) this.lessons[idx] = updated
    },
    async removeLesson(id: string) {
      await deleteLesson(id)
      this.lessons = this.lessons.filter(l => l.id !== id)
    },
  },
})


