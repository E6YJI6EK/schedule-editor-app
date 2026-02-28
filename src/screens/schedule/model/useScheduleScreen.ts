import { ref, computed } from 'vue';
import { useScheduleStore } from '@/stores/scheduleStore';
import type { Group } from '@/api/types';

export function useScheduleScreen() {
  const scheduleStore = useScheduleStore();

  const selectedGroups = ref<Group[]>([]);
  const showSchedule = ref(false);

  const isLoading = computed(() => scheduleStore.loading);
  const error = computed(() => scheduleStore.error);

  const handleShowSchedule = async () => {
    if (selectedGroups.value.length === 0) {
      return;
    }
    showSchedule.value = true;
    const groupIds = selectedGroups.value.map((g) => g.id);
    await scheduleStore.loadBothWeeks(groupIds, selectedGroups.value);
  };

  return {
    scheduleStore,
    selectedGroups,
    showSchedule,
    isLoading,
    error,
    handleShowSchedule,
  };
}

