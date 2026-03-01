<template>
  <div class="flex items-center justify-between p-4 bg-white border-b border-gray-200">
    <div class="flex items-center space-x-4">
      <h1 class="text-2xl font-bold text-gray-800">Редактор расписания</h1>
    </div>

    <div v-if="scheduleShown" class="flex items-center space-x-3">
      <button @click="exportToExcel"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FileSpreadsheet class="w-4 h-4 mr-2" />
        Excel
      </button>

      <button @click="exportToPDF"
        class="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        <FileText class="w-4 h-4 mr-2" />
        PDF
      </button>

      <WeekSwitcher v-if="scheduleShown" :currentWeek="currentWeek" :switchWeek="switchWeek" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Schedule, WeekTypeShort } from '@/types/schedule';
import { FileSpreadsheet, FileText } from 'lucide-vue-next';
import { exportToExcel as exportExcel } from '../model/exportExcel';
import { exportToPDF as exportPDF } from '../model/exportPDF';
import WeekSwitcher from './WeekSwitcher.vue';

interface Props {
  schedule: Schedule;
  currentWeek: WeekTypeShort;
  scheduleShown: boolean;
  switchWeek: () => void;
}

const { schedule, switchWeek } = defineProps < Props > ();

const exportToExcel = () => {
  exportExcel(schedule);
};

const exportToPDF = () => {
  exportPDF(schedule);
};
</script>
