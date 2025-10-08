<template>
  <div class="flex items-center justify-between p-4 bg-white border-b border-gray-200">
    <div class="flex items-center space-x-4">
      <h1 class="text-2xl font-bold text-gray-800">Редактор расписания</h1>
    </div>
    
    <div class="flex items-center space-x-3">
      <button
        @click="addNewClass"
        class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Добавить пару
      </button>
      
      <button
        @click="exportToExcel"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FileSpreadsheet class="w-4 h-4 mr-2" />
        Excel
      </button>
      
      <button
        @click="exportToPDF"
        class="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <FileText class="w-4 h-4 mr-2" />
        PDF
      </button>
      
      <WeekSwitcher />
    </div>
  </div>
</template>

<script setup>
import { Plus, FileSpreadsheet, FileText } from 'lucide-vue-next';
import WeekSwitcher from './WeekSwitcher.vue';
import { useScheduleStore } from '@/stores/scheduleStore';
import { exportToExcel as exportExcel } from '@/utils/exportExcel';
import { exportToPDF as exportPDF } from '@/utils/exportPDF';

const scheduleStore = useScheduleStore();

const addNewClass = () => {
  // This will be handled by the ScheduleCell component
  console.log('Add new class functionality');
};

const exportToExcel = () => {
  exportExcel(scheduleStore.schedule, scheduleStore.currentWeek);
};

const exportToPDF = () => {
  exportPDF(scheduleStore.schedule, scheduleStore.currentWeek);
};
</script>
