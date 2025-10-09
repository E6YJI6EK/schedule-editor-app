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
    updateCell(week, day, time, groupIndex, newData) {
      const targetWeek = this.schedule[week];
      const dayData = targetWeek.find(d => d.day === day);
      const timeSlot = dayData.timeslots.find(t => t.time === time);
      if (timeSlot && timeSlot.groups && timeSlot.groups[groupIndex]) {
        Object.assign(timeSlot.groups[groupIndex], newData);
      }
    },
    addNewClass(week, day, time, groupIndex, classData) {
      const targetWeek = this.schedule[week];
      const dayData = targetWeek.find(d => d.day === day);
      const timeSlot = dayData.timeslots.find(t => t.time === time);
      if (timeSlot && timeSlot.groups && timeSlot.groups[groupIndex]) {
        Object.assign(timeSlot.groups[groupIndex], classData);
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
