<script setup lang="ts">
import { computed, ref } from "vue";
import { VueCal } from "vue-cal";
import "vue-cal/style";
import type { LessonItem, TimeSlot } from "@/pages/SchedulePage/model/types";
import { colorByRoom } from "@/pages/SchedulePage/model/room-colors";

const props = defineProps<{
  timeSlots: TimeSlot[];
  lessons: LessonItem[];
}>();

// Reference week: start from Monday of a fixed date
const referenceMonday = new Date("2025-01-06T00:00:00"); // Monday

function mapLessonToEvent(l: LessonItem) {
  const slot = props.timeSlots.find((s) => s.label === l.timeSlotLabel);
  if (!slot) return null;
  const startH = Math.floor(slot.startMinutes / 60);
  const startM = slot.startMinutes % 60;
  const endH = Math.floor(slot.endMinutes / 60);
  const endM = slot.endMinutes % 60;
  const dayOffset = l.dayOfWeek - 1;
  const start = new Date(referenceMonday);
  start.setDate(referenceMonday.getDate() + dayOffset);
  start.setHours(startH, startM, 0, 0);
  const end = new Date(referenceMonday);
  end.setDate(referenceMonday.getDate() + dayOffset);
  end.setHours(endH, endM, 0, 0);

  return {
    start,
    end,
    title: `${l.subjectTitle} — ${l.groupCode}`,
    class: colorByRoom(l.roomNumber),
    content: `${l.teacherFullName}\nАуд. ${l.roomNumber}, корп. ${l.buildingNumber}`,
    id: l.id,
  };
}

const events = computed(() =>
  props.lessons.map(mapLessonToEvent).filter((e): e is any => e !== null)
);

const view = ref<"week">("week");
</script>

<template>
  <div class="rounded border">
    <VueCal
      :events="events"
      :time-from="8 * 60"
      :time-to="19 * 60"
      :hide-view-selector="true"
      :default-view="view"
      :time-step="10"
      :disable-views="['day', 'month', 'year']"
      :start-week-on="1"
      :sticky-split-labels="true"
    />
  </div>
</template>

<style scoped>
.vuecal__event.bg-rose-200 {
  background-color: rgb(254 205 211);
}
.vuecal__event.bg-amber-200 {
  background-color: rgb(253 230 138);
}
.vuecal__event.bg-emerald-200 {
  background-color: rgb(167 243 208);
}
.vuecal__event.bg-sky-200 {
  background-color: rgb(186 230 253);
}
.vuecal__event.bg-violet-200 {
  background-color: rgb(221 214 254);
}
.vuecal__event.bg-pink-200 {
  background-color: rgb(251 207 232);
}
.vuecal__event.bg-lime-200 {
  background-color: rgb(217 249 157);
}
.vuecal__event.bg-cyan-200 {
  background-color: rgb(165 243 252);
}
.vuecal__event.bg-indigo-200 {
  background-color: rgb(199 210 254);
}
</style>
