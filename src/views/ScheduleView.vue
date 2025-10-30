<script setup lang="ts">

import { useScheduleStore } from "@/stores/scheduleStore.ts";
import { roomColors } from "@/utils/mockData.ts";
import Toolbar from "@/components/Toolbar.vue";
import ScheduleTable from "@/components/ScheduleTable.vue";
import { useGroupsStore } from "@/stores/groups";

const groupsStore = useGroupsStore();
const scheduleStore = useScheduleStore();

</script>
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
    </div>
  </div>
</template>


