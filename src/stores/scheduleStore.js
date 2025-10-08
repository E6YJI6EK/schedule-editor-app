import { defineStore } from 'pinia';
import { mockSchedule } from '@/utils/mockData';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedule: mockSchedule,
    currentWeek: 'upper', // 'upper' or 'lower'
  }),
  actions: {
    switchWeek() {
      this.currentWeek = this.currentWeek === 'upper' ? 'lower' : 'upper';
    },
    updateCell(week, day, time, newData) {
      const targetWeek = this.schedule[week];
      const dayData = targetWeek.find(d => d.day === day);
      const cell = dayData.timeslots.find(t => t.time === time);
      Object.assign(cell, newData);
    },
    addNewClass(week, day, time, classData) {
      const targetWeek = this.schedule[week];
      const dayData = targetWeek.find(d => d.day === day);
      const existingCell = dayData.timeslots.find(t => t.time === time);
      if (existingCell) {
        Object.assign(existingCell, classData);
      }
    },
    getCurrentWeekData() {
      return this.schedule[this.currentWeek];
    },
    getWeekData(weekType) {
      return this.schedule[weekType];
    }
  },
});
