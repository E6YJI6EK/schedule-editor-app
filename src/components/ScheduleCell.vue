<script setup lang="ts">
import BuildingSelect from "@/components/form-fields/BuildingSelect.vue";
import RoomSelect from "@/components/form-fields/RoomSelect.vue";
import SubjectSelect from "@/components/form-fields/SubjectSelect.vue";
import TeacherSelect from "@/components/form-fields/TeacherSelect.vue";
import { useScheduleStore } from "@/stores/scheduleStore.ts";
import { reactive, ref } from "vue";

import type { ClassData, WeekType } from "@/types/schedule";

interface Props {
  cellData: ClassData;
  day: string;
  time: string;
  group: string;
  groupIndex: number;
  weekType: WeekType;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "#ffffff",
});

const scheduleStore = useScheduleStore();
const showEditDialog = ref(false);
const isDragging = ref(false);
const isDragOver = ref(false);
const isBeingDragged = ref(false);

const editData = reactive<ClassData>({
  subject: null,
  teacher: null,
  room: null,
  building: null,
});

const openEditDialog = () => {
  // Don't open dialog if we just finished dragging
  if (isBeingDragged.value) {
    isBeingDragged.value = false;
    return;
  }

  // Initialize edit data with current cell data
  Object.assign(editData, props.cellData);
  showEditDialog.value = true;
};

const closeEditDialog = () => {
  showEditDialog.value = false;
};

const saving = ref(false);
const saveError = ref<string | null>(null);

const saveChanges = async () => {
  saving.value = true;
  saveError.value = null;
  
  try {
    await scheduleStore.updateCell(
      props.weekType,
      props.day,
      props.time,
      props.groupIndex,
      { 
        ...editData,
        groupId: props.cellData.groupId, // Передаем groupId из текущей ячейки
      }
    );
    closeEditDialog();
  } catch (error: any) {
    saveError.value = error.message || 'Ошибка при сохранении';
    console.error('Ошибка при сохранении:', error);
  } finally {
    saving.value = false;
  }
};

// Drag and Drop handlers
const handleDragStart = (event: DragEvent) => {
  if (!props.cellData.subject || !event.dataTransfer) return;

  isDragging.value = true;
  isBeingDragged.value = true;

  const dragData = {
    weekType: props.weekType,
    day: props.day,
    time: props.time,
    groupIndex: props.groupIndex,
    cellData: { ...props.cellData },
  };

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("application/json", JSON.stringify(dragData));
};

const handleDragOver = (event: DragEvent) => {
  if (!event.dataTransfer) return;
  event.preventDefault();
  isDragOver.value = true;
  event.dataTransfer.dropEffect = "move";
};

const handleDragEnd = () => {
  isDragging.value = false;
  // Reset isBeingDragged after a short delay
  setTimeout(() => {
    isBeingDragged.value = false;
  }, 100);
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (event: DragEvent) => {
  if (!event.dataTransfer) return;
  event.preventDefault();
  isDragOver.value = false;
  isDragging.value = false;

  try {
    const dragData = JSON.parse(event.dataTransfer.getData("application/json"));

    // Don't drop on the same cell
    if (
      dragData.weekType === props.weekType &&
      dragData.day === props.day &&
      dragData.time === props.time &&
      dragData.groupIndex === props.groupIndex
    ) {
      return;
    }
    // Move the class to the new cell
    scheduleStore.moveCell(
      dragData.weekType,
      dragData.day,
      dragData.time,
      dragData.groupIndex,
      props.weekType,
      props.day,
      props.time,
      props.groupIndex
    );
  } catch (error) {
    console.error("Error during drop:", error);
  }
};
</script>

<template>
  <div
    :draggable="!!cellData.subject"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
    @click="openEditDialog"
    class="h-20 p-2 border border-gray-300 rounded-lg transition-all"
    :class="{
      'cursor-move hover:shadow-md': cellData.subject,
      'cursor-pointer hover:shadow-md': !cellData.subject,
      'bg-blue-100 border-blue-400 border-2': isDragOver,
      'opacity-50': isDragging,
    }"
    :style="{ backgroundColor: isDragOver ? '#dbeafe' : color }"
  >
    <div v-if="cellData.subject" class="text-xs pointer-events-none relative">
      <div class="font-semibold text-gray-800 truncate">
        {{ cellData.subject.name }}
      </div>
      <div class="text-gray-600 truncate">{{ cellData.teacher?.name }}</div>
      <div class="text-gray-600 truncate">
        {{ cellData.room?.number }} ({{ cellData.building?.name }})
      </div>
      <div class="absolute top-0 right-0 text-gray-400 text-xs opacity-50">
        ⋮⋮
      </div>
    </div>
    <div
      v-else
      class="flex items-center justify-center h-full text-gray-400 text-sm pointer-events-none"
    >
      Пусто
    </div>
  </div>

  <!-- Edit Dialog -->
  <div
    v-if="showEditDialog"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="closeEditDialog"
  >
    <div class="bg-white rounded-lg p-6 w-96 max-w-full mx-4" @click.stop>
      <h3 class="text-lg font-semibold mb-4">
        Редактировать пару - {{ group }}
      </h3>

      <div class="space-y-4">
        <SubjectSelect v-model="editData.subject" />
        <TeacherSelect
          :discipline-id="editData.subject?.id"
          v-model="editData.teacher"
        />
        <BuildingSelect v-model="editData.building" />
        <RoomSelect
          :building-id="editData.building?.id"
          v-model="editData.room"
        />
      </div>

      <!-- Сообщение об ошибке -->
      <div v-if="saveError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
        {{ saveError }}
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="closeEditDialog"
          :disabled="saving"
          class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Отмена
        </button>
        <button
          @click="saveChanges"
          :disabled="saving"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <span v-if="saving" class="mr-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ saving ? 'Сохранение...' : 'Сохранить' }}
        </button>
      </div>
    </div>
  </div>
</template>
