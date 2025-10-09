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
    moveCell(fromWeek, fromDay, fromTime, fromGroupIndex, toWeek, toDay, toTime, toGroupIndex) {
      // Get source cell data
      const fromWeekData = this.schedule[fromWeek];
      const fromDayData = fromWeekData.find(d => d.day === fromDay);
      const fromTimeSlot = fromDayData.timeslots.find(t => t.time === fromTime);
      const fromCell = fromTimeSlot?.groups?.[fromGroupIndex];
      
      if (!fromCell) return;
      
      // Get target cell data
      const toWeekData = this.schedule[toWeek];
      const toDayData = toWeekData.find(d => d.day === toDay);
      const toTimeSlot = toDayData.timeslots.find(t => t.time === toTime);
      const toCell = toTimeSlot?.groups?.[toGroupIndex];
      
      if (!toCell) return;
      
      // Swap cells
      const temp = { ...fromCell };
      Object.assign(fromCell, toCell);
      Object.assign(toCell, temp);
    },
    getCurrentWeekData() {
      return this.schedule[this.currentWeek];
    },
    getWeekData(weekType) {
      return this.schedule[weekType];
    }
  },
});
