<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { TIME_SLOTS } from "./model/time-config";
import WeekToggle from "./ui/WeekToggle.vue";
import ScheduleGrid from "./ui/ScheduleGrid.vue";
import EditorDialog from "./ui/EditorDialog.vue";
import Legend from "./ui/Legend.vue";
import { useScheduleStore } from "@/stores/schedule.store.ts";

const store = useScheduleStore();
const week = ref(store.currentWeek);

onMounted(() => {
  store.load();
});

const lessonsOdd = computed(() =>
  store.lessons.filter((l) => l.week === "odd")
);
const lessonsEven = computed(() =>
  store.lessons.filter((l) => l.week === "even")
);
const legendRooms = computed(() =>
  store.lessons.map((l) => l.roomNumber).filter(Boolean)
);

const editorOpen = ref(false);
const editing = ref(null as any);
function openEditor() {
  editorOpen.value = true;
}
function closeEditor() {
  editorOpen.value = false;
  editing.value = null;
}
async function saveEditor(payload: any) {
  if (payload.id) await store.editLesson(payload.id, payload);
  else await store.addLesson(payload);
  closeEditor();
}

function onWeekChange(v: "odd" | "even") {
  week.value = v;
  store.setWeek(v);
}
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">Редактор расписания</h1>
      <WeekToggle v-model="week" @update:modelValue="onWeekChange" />
    </div>

    <div class="flex items-center justify-between">
      <Legend :rooms="legendRooms" />
      <button class="rounded bg-black px-3 py-1 text-white" @click="openEditor">
        Добавить
      </button>
    </div>

    <div class="space-y-8">
      <section>
        <h2 class="mb-2 font-semibold">Нечётная неделя</h2>
        <ScheduleGrid :time-slots="TIME_SLOTS" :lessons="lessonsOdd" />
      </section>
      <section>
        <h2 class="mb-2 font-semibold">Чётная неделя</h2>
        <ScheduleGrid :time-slots="TIME_SLOTS" :lessons="lessonsEven" />
      </section>
    </div>

    <EditorDialog
      :open="editorOpen"
      :week="week"
      :editing="editing"
      @close="closeEditor"
      @save="saveEditor"
    />
  </div>
</template>

<style scoped></style>
