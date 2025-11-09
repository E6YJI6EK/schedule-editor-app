<script setup lang="ts">
import { ref, computed } from 'vue';
import { useScheduleStore } from "@/stores/scheduleStore.ts";
import { roomColors } from "@/utils/mockData.ts";
import Toolbar from "@/components/Toolbar.vue";
import ScheduleTable from "@/components/ScheduleTable.vue";
import GroupMultiSelect from "@/components/form-fields/GroupMultiSelect.vue";
import { Button } from "@/components/ui/button";
import type { Group } from "@/shared/api/types";

const scheduleStore = useScheduleStore();

// Выбранные группы
const selectedGroups = ref<Group[]>([]);
const showSchedule = ref(false);

// Показываем состояние загрузки
const isLoading = computed(() => scheduleStore.loading);
const error = computed(() => scheduleStore.error);

// Обработчик нажатия на кнопку "Показать расписание"
const handleShowSchedule = async () => {
  if (selectedGroups.value.length === 0) {
    return;
  }
  
  showSchedule.value = true;
  const groupIds = selectedGroups.value.map(g => g.id);
  await scheduleStore.loadBothWeeks(groupIds, selectedGroups.value);
};
</script>
<template>
  <div class="min-h-screen bg-gray-100">
    <Toolbar />

    <div class="container mx-auto px-4 py-6 space-y-8">
      <!-- Форма выбора групп -->
      <div v-if="!showSchedule" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Выбор групп для расписания</h2>
        
        <div class="space-y-4">
          <GroupMultiSelect v-model="selectedGroups" />
          
          <div class="flex justify-end">
            <Button
              @click="handleShowSchedule"
              :disabled="selectedGroups.length === 0 || isLoading"
              class="px-6 py-2"
            >
              Показать расписание
            </Button>
          </div>
        </div>
      </div>

      <!-- Сообщение об ошибке -->
      <div v-if="error && showSchedule" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>

      <!-- Индикатор загрузки -->
      <div v-if="isLoading && showSchedule" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p class="mt-2 text-gray-600">Загрузка расписания...</p>
      </div>

      <!-- Таблица расписания -->
      <div v-if="showSchedule && !isLoading">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">Расписание</h2>
          <Button
            @click="showSchedule = false"
            variant="outline"
            class="px-4 py-2"
          >
            Изменить группы
          </Button>
        </div>
        
        <ScheduleTable
          :week-type="
            scheduleStore.currentWeek === 'upper' ? 'upperWeek' : 'lowerWeek'
          "
          :data="
            scheduleStore.getWeekData(
              scheduleStore.currentWeek === 'upper' ? 'upperWeek' : 'lowerWeek'
            )
          "
          :colors="roomColors"
        />
      </div>
    </div>
  </div>
</template>


