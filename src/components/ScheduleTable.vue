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

<script setup>
import { computed } from 'vue';
import ScheduleCell from './ScheduleCell.vue';
import { mockSchedule } from '@/utils/mockData';

const props = defineProps({
  weekType: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  colors: {
    type: Object,
    required: true
  }
});

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const groups = mockSchedule.groups;

const times = computed(() => {
  const allTimes = [];
  props.data.forEach(day => {
    day.timeslots.forEach(slot => {
      if (!allTimes.includes(slot.time)) {
        allTimes.push(slot.time);
      }
    });
  });
  return allTimes.sort();
});

const getCellData = (day, time, groupIndex) => {
  const dayData = props.data.find(d => d.day === day);
  const timeSlot = dayData?.timeslots.find(t => t.time === time);
  return timeSlot?.groups?.[groupIndex] || { subject: '', teacher: '', room: '', building: '' };
};

const getCellColor = (day, time, groupIndex) => {
  const cellData = getCellData(day, time, groupIndex);
  return cellData.room ? (props.colors[cellData.room] || '#ffffff') : '#ffffff';
};
</script>
