<template>
  <div class="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <!-- Row 1: Days of week -->
          <tr class="bg-gray-100">
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200" rowspan="2">
              Время
            </th>
            <th
              v-for="day in days"
              :key="day"
              :colspan="groups.length"
              class="px-4 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
            >
              {{ day }}
            </th>
          </tr>
          <!-- Row 2: Groups -->
          <tr class="bg-gray-50">
            <template v-for="day in days" :key="day">
              <th
                v-for="(group, idx) in groups"
                :key="`${day}-${group}`"
                class="px-2 py-2 text-center text-xs font-medium text-gray-600 border-r border-gray-200"
                :class="{ 'border-r-2 border-gray-300': idx === groups.length - 1 && day !== days[days.length - 1] }"
              >
                {{ group }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="time in times"
            :key="time"
            class="border-b border-gray-200 last:border-b-0"
          >
            <td class="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200 bg-gray-50">
              {{ time }}
            </td>
            <template v-for="day in days" :key="day">
              <td
                v-for="(group, groupIdx) in groups"
                :key="`${day}-${time}-${group}`"
                class="p-2 border-r border-gray-200"
                :class="{ 'border-r-2 border-gray-300': groupIdx === groups.length - 1 && day !== days[days.length - 1] }"
              >
                <ScheduleCell
                  :cell-data="getCellData(day, time, groupIdx)"
                  :day="day"
                  :time="time"
                  :group="group"
                  :group-index="groupIdx"
                  :week-type="weekType"
                  :color="getCellColor(day, time, groupIdx)"
                />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ScheduleCell from './ScheduleCell.vue';
import { useScheduleStore } from '@/stores/scheduleStore';
import type { DaySchedule, RoomColors, WeekType } from '@/types/schedule';

interface Props {
  weekType: WeekType;
  data: DaySchedule[];
  colors: RoomColors;
}

const props = defineProps<Props>();

const scheduleStore = useScheduleStore();

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const groups = computed(() => scheduleStore.schedule.groups);

// Стандартные временные слоты (если данных нет, используем их)
const DEFAULT_TIMES = [
  '08:30–10:00',
  '10:10–11:40',
  '12:00–13:30',
  '13:40–15:10',
  '15:20–16:50',
  '17:00–18:30',
]

const times = computed<string[]>(() => {
  const allTimes: string[] = [];
  props.data.forEach(day => {
    day.timeslots.forEach(slot => {
      if (!allTimes.includes(slot.time)) {
        allTimes.push(slot.time);
      }
    });
  });
  
  // Если нет временных слотов в данных, используем стандартные
  if (allTimes.length === 0) {
    return DEFAULT_TIMES;
  }
  
  return allTimes.sort();
});

const getCellData = (day: string, time: string, groupIndex: number) => {
  const dayData = props.data.find(d => d.day === day);
  const timeSlot = dayData?.timeslots.find(t => t.time === time);
  return timeSlot?.groups?.[groupIndex] || { subject: null, teacher: null, room: null, building: null };
};

const getCellColor = (day: string, time: string, groupIndex: number): string => {
  const cellData = getCellData(day, time, groupIndex);
  return cellData.room ? (props.colors[cellData.room] || '#ffffff') : '#ffffff';
};
</script>
