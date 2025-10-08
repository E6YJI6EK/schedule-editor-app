<template>
  <div class="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800">
        {{ weekType === 'upperWeek' ? 'Верхняя неделя' : 'Нижняя неделя' }}
      </h2>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
              Время
            </th>
            <th
              v-for="day in days"
              :key="day"
              class="px-4 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
            >
              {{ day }}
            </th>
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
            <td
              v-for="day in days"
              :key="`${day}-${time}`"
              class="p-2 border-r border-gray-200 last:border-r-0"
            >
              <ScheduleCell
                :cell-data="getCellData(day, time)"
                :day="day"
                :time="time"
                :week-type="weekType"
                :color="getCellColor(day, time)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ScheduleCell from './ScheduleCell.vue';

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

const getCellData = (day, time) => {
  const dayData = props.data.find(d => d.day === day);
  const timeSlot = dayData?.timeslots.find(t => t.time === time);
  return timeSlot || { subject: '', teacher: '', group: '', room: '', building: '' };
};

const getCellColor = (day, time) => {
  const cellData = getCellData(day, time);
  return cellData.room ? (props.colors[cellData.room] || '#ffffff') : '#ffffff';
};
</script>
