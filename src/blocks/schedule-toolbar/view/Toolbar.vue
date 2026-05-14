<script setup lang="ts">
import type { Schedule, WeekTypeShort } from "@/types/schedule";
import { FileSpreadsheet, FileText } from "lucide-vue-next";
import { exportToExcel as exportExcel } from "../model/exportExcel";
import { exportToPDF as exportPDF } from "../model/exportPDF";
import WeekSwitcher from "./WeekSwitcher.vue";
import Logo from "@/units/logo/view.vue";
import AuthInfo from "@/blocks/auth-info/view.vue";

interface Props {
  schedule: Schedule;
  currentWeek: WeekTypeShort;
  scheduleShown: boolean;
  switchWeek: () => void;
}

const { schedule, switchWeek } = defineProps<Props>();

const exportToExcel = () => exportExcel(schedule);
const exportToPDF = () => exportPDF(schedule);
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
    >
      <Logo />

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
        <AuthInfo />
      </div>
    </div>
  </header>
</template>
