<script setup lang="ts">
import { DAYS, TIME_SLOTS } from "@/pages/SchedulePage/model/time-config.ts";
import type { LessonItem, WeekType } from "@/pages/SchedulePage/model/types";
import { ref, watch } from "vue";

const props = defineProps<{
  open: boolean;
  week: WeekType;
  editing?: LessonItem | null;
}>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", payload: Omit<LessonItem, "id"> & { id?: string }): void;
}>();

const form = ref({
  week: props.week as WeekType,
  dayOfWeek: 1,
  timeSlotLabel: TIME_SLOTS[0]!.label,
  teacherFullName: "",
  groupCode: "",
  subjectTitle: "",
  roomNumber: "",
  buildingNumber: "",
});

watch(
  () => props.week,
  (w) => {
    form.value.week = w;
  }
);
watch(
  () => props.editing,
  (e) => {
    if (e) {
      form.value = {
        week: e.week,
        dayOfWeek: e.dayOfWeek,
        timeSlotLabel: e.timeSlotLabel,
        teacherFullName: e.teacherFullName,
        groupCode: e.groupCode,
        subjectTitle: e.subjectTitle,
        roomNumber: e.roomNumber,
        buildingNumber: e.buildingNumber,
      };
    }
  }
);

function onSave() {
  const payload = { ...form.value };
  emit("save", props.editing ? { ...payload, id: props.editing.id } : payload);
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
  >
    <div class="w-full max-w-2xl rounded bg-white p-4 shadow-lg">
      <div class="mb-3 flex items-center justify-between">
        <h3 class="text-lg font-semibold">Пара</h3>
        <button class="text-sm" @click="$emit('close')">Закрыть</button>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="flex flex-col gap-1">
          <span class="text-xs">Неделя</span>
          <select v-model="form.week" class="rounded border p-2">
            <option value="odd">Нечётная</option>
            <option value="even">Чётная</option>
          </select>
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs">День</span>
          <select v-model.number="form.dayOfWeek" class="rounded border p-2">
            <option v-for="d in DAYS" :key="d.key" :value="d.key">
              {{ d.label }}
            </option>
          </select>
        </label>
        <label class="flex flex-col gap-1 col-span-2">
          <span class="text-xs">Время</span>
          <select v-model="form.timeSlotLabel" class="rounded border p-2">
            <option v-for="s in TIME_SLOTS" :key="s.label" :value="s.label">
              {{ s.label }}
            </option>
          </select>
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs">Дисциплина</span>
          <input v-model="form.subjectTitle" class="rounded border p-2" />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs">Преподаватель</span>
          <input v-model="form.teacherFullName" class="rounded border p-2" />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs">Группа</span>
          <input v-model="form.groupCode" class="rounded border p-2" />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs">Аудитория</span>
          <input v-model="form.roomNumber" class="rounded border p-2" />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs">Корпус</span>
          <input v-model="form.buildingNumber" class="rounded border p-2" />
        </label>
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <button class="rounded border px-3 py-1" @click="$emit('close')">
          Отмена
        </button>
        <button class="rounded bg-black px-3 py-1 text-white" @click="onSave">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
