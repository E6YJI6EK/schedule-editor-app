<template>
  <div class="min-h-screen bg-gray-100">
    <Toolbar />
    
    <div class="container mx-auto px-4 py-6 space-y-8">
      <ScheduleTable
        week-type="upperWeek"
        :data="scheduleStore.getWeekData('upperWeek')"
        :colors="roomColors"
      />
      
      <ScheduleTable
        week-type="lowerWeek"
        :data="scheduleStore.getWeekData('lowerWeek')"
        :colors="roomColors"
      />
    </div>
  </div>
</template>

<script setup>
import { useScheduleStore } from '@/stores/scheduleStore';
import { roomColors } from '@/utils/mockData';
import Toolbar from '@/components/Toolbar.vue';
import ScheduleTable from '@/components/ScheduleTable.vue';

const scheduleStore = useScheduleStore();
</script>
