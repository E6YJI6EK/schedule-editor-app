<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();

const isScheduleEditing = ref(false);

watch(
  () => route.path,
  (newPath) => {
    isScheduleEditing.value = newPath.includes("/schedule");
  },
  { immediate: true },
);
</script>

<template>
  <router-link
    v-if="!isScheduleEditing"
    to="/schedule"
    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
  >
    Редактировать расписание
  </router-link>
</template>
