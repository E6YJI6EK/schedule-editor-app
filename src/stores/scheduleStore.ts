import { defineStore } from 'pinia';
import { mockSchedule } from '@/utils/mockData';
import type { Schedule, WeekType, WeekTypeShort, ClassData } from '@/types/schedule';

interface ScheduleState {
  schedule: Schedule;
  currentWeek: WeekTypeShort;
}

export const useScheduleStore = defineStore('schedule', {
  state: (): ScheduleState => ({
    schedule: mockSchedule,
    currentWeek: 'upper' as WeekTypeShort,
  }),
  actions: {
    switchWeek(): void {
      this.currentWeek = this.currentWeek === 'upper' ? 'lower' : 'upper';
    },
    updateCell(week: WeekType, day: string, time: string, groupIndex: number, newData: Partial<ClassData>): void {
      const targetWeek = this.schedule[week];
      const dayData = targetWeek.find(d => d.day === day);
      const timeSlot = dayData?.timeslots.find(t => t.time === time);
      if (timeSlot && timeSlot.groups && timeSlot.groups[groupIndex]) {
        Object.assign(timeSlot.groups[groupIndex], newData);
      }
    },
    addNewClass(week: WeekType, day: string, time: string, groupIndex: number, classData: ClassData): void {
      const targetWeek = this.schedule[week];
      const dayData = targetWeek.find(d => d.day === day);
      const timeSlot = dayData?.timeslots.find(t => t.time === time);
      if (timeSlot && timeSlot.groups && timeSlot.groups[groupIndex]) {
        Object.assign(timeSlot.groups[groupIndex], classData);
      }
    },
    moveCell(
      fromWeek: WeekType, 
      fromDay: string, 
      fromTime: string, 
      fromGroupIndex: number, 
      toWeek: WeekType, 
      toDay: string, 
      toTime: string, 
      toGroupIndex: number
    ): void {
      // Get source cell data
      const fromWeekData = this.schedule[fromWeek];
      const fromDayData = fromWeekData.find(d => d.day === fromDay);
      const fromTimeSlot = fromDayData?.timeslots.find(t => t.time === fromTime);
      const fromCell = fromTimeSlot?.groups?.[fromGroupIndex];
      
      if (!fromCell) return;
      
      // Get target cell data
      const toWeekData = this.schedule[toWeek];
      const toDayData = toWeekData.find(d => d.day === toDay);
      const toTimeSlot = toDayData?.timeslots.find(t => t.time === toTime);
      const toCell = toTimeSlot?.groups?.[toGroupIndex];
      
      if (!toCell) return;
      
      // Swap cells
      const temp = { ...fromCell };
      Object.assign(fromCell, toCell);
      Object.assign(toCell, temp);
    },
    getCurrentWeekData() {
      const weekType: WeekType = this.currentWeek === 'upper' ? 'upperWeek' : 'lowerWeek';
      return this.schedule[weekType];
    },
    getWeekData(weekType: WeekType) {
      return this.schedule[weekType];
    }
  },
});
