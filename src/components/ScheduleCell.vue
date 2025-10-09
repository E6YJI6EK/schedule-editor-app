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
      'opacity-50': isDragging
    }"
    :style="{ backgroundColor: isDragOver ? '#dbeafe' : color }"
  >
    <div v-if="cellData.subject" class="text-xs pointer-events-none relative">
      <div class="font-semibold text-gray-800 truncate">{{ cellData.subject }}</div>
      <div class="text-gray-600 truncate">{{ cellData.teacher }}</div>
      <div class="text-gray-600 truncate">{{ cellData.room }} ({{ cellData.building }})</div>
      <div class="absolute top-0 right-0 text-gray-400 text-xs opacity-50">⋮⋮</div>
    </div>
    <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm pointer-events-none">
      Пусто
    </div>
  </div>

  <!-- Edit Dialog -->
  <div
    v-if="showEditDialog"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="closeEditDialog"
  >
    <div
      class="bg-white rounded-lg p-6 w-96 max-w-full mx-4"
      @click.stop
    >
      <h3 class="text-lg font-semibold mb-4">Редактировать пару - {{ group }}</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Предмет</label>
          <input
            v-model="editData.subject"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите название предмета"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Преподаватель</label>
          <input
            v-model="editData.teacher"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите ФИО преподавателя"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Аудитория</label>
          <input
            v-model="editData.room"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите номер аудитории"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Корпус</label>
          <input
            v-model="editData.building"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите номер корпуса"
          />
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="closeEditDialog"
          class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
        <button
          @click="saveChanges"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useScheduleStore } from '@/stores/scheduleStore.ts';

const props = defineProps({
  cellData: {
    type: Object,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  groupIndex: {
    type: Number,
    required: true
  },
  weekType: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#ffffff'
  }
});

const scheduleStore = useScheduleStore();
const showEditDialog = ref(false);
const isDragging = ref(false);
const isDragOver = ref(false);
const isBeingDragged = ref(false);

const editData = reactive({
  subject: '',
  teacher: '',
  room: '',
  building: ''
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

const saveChanges = () => {
  scheduleStore.updateCell(props.weekType, props.day, props.time, props.groupIndex, { ...editData });
  closeEditDialog();
};

// Drag and Drop handlers
const handleDragStart = (event) => {
  if (!props.cellData.subject) return;
  
  isDragging.value = true;
  isBeingDragged.value = true;
  
  const dragData = {
    weekType: props.weekType,
    day: props.day,
    time: props.time,
    groupIndex: props.groupIndex,
    cellData: { ...props.cellData }
  };
  
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('application/json', JSON.stringify(dragData));
};

const handleDragOver = (event) => {
  event.preventDefault();
  isDragOver.value = true;
  event.dataTransfer.dropEffect = 'move';
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

const handleDrop = (event) => {
  event.preventDefault();
  isDragOver.value = false;
  isDragging.value = false;
  
  try {
    const dragData = JSON.parse(event.dataTransfer.getData('application/json'));
    
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
    console.error('Error during drop:', error);
  }
};
</script>
