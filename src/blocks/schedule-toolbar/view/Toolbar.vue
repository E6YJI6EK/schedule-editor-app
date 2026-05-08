<template>
  <div class="flex items-center justify-between p-4 bg-white border-b border-gray-200">
    <div class="flex items-center space-x-4">
      <h1 class="text-2xl font-bold text-gray-800">Редактор расписания</h1>
    </div>

    <div class="flex items-center gap-3">
      <div v-if="scheduleShown" class="flex items-center space-x-3">
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

        <WeekSwitcher :currentWeek="currentWeek" :switchWeek="switchWeek" />
      </div>

      <!-- Auth section -->
      <div class="flex items-center gap-2 pl-3 border-l border-gray-200">
        <router-link
          v-if="authStore.isAdmin"
          to="/admin"
          class="px-3 py-1.5 text-sm text-purple-700 bg-purple-50 rounded-md hover:bg-purple-100 border border-purple-200 transition-colors"
        >
          Администрирование
        </router-link>

        <span class="text-sm text-gray-700 font-medium">{{ authStore.user?.name }}</span>

        <span
          class="text-xs px-2 py-0.5 rounded-full font-medium"
          :class="authStore.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
        >
          {{ authStore.isAdmin ? 'Администратор' : 'Сотрудник' }}
        </span>

        <button
          @click="handleLogout"
          class="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Выйти
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Schedule, WeekTypeShort } from '@/types/schedule';
import { FileSpreadsheet, FileText } from 'lucide-vue-next';
import { exportToExcel as exportExcel } from '../model/exportExcel';
import { exportToPDF as exportPDF } from '../model/exportPDF';
import WeekSwitcher from './WeekSwitcher.vue';
import { useAuthStore } from '@/screens/auth/model/authStore';

interface Props {
  schedule: Schedule;
  currentWeek: WeekTypeShort;
  scheduleShown: boolean;
  switchWeek: () => void;
}

const { schedule, switchWeek } = defineProps<Props>();
const router = useRouter();
const authStore = useAuthStore();

const exportToExcel = () => exportExcel(schedule);
const exportToPDF = () => exportPDF(schedule);

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>
