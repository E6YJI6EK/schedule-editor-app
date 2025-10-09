<template>
  <div class="min-h-screen bg-gray-100">
    <Toolbar />

    <div class="container mx-auto px-4 py-6 space-y-8">
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

      <!-- <ScheduleTable
        week-type="lowerWeek"
        :data="scheduleStore.getWeekData('lowerWeek')"
        :colors="roomColors"
      /> -->
    </div>
  </div>
</template>

<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { roomColors } from "@/utils/mockData";
import Toolbar from "@/components/Toolbar.vue";
import ScheduleTable from "@/components/ScheduleTable.vue";

const scheduleStore = useScheduleStore();
</script>
