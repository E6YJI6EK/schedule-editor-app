<script setup lang="ts">
import { computed } from 'vue'
import { colorByRoom } from '@/pages/SchedulePage/model/room-colors'

const props = defineProps<{ rooms: string[] }>()
const uniqueRooms = computed(() => Array.from(new Set(props.rooms)))
</script>

<template>
  <div class="flex flex-wrap gap-2 text-xs">
    <div v-for="r in uniqueRooms" :key="r" class="flex items-center gap-2">
      <div :class="['h-3 w-3 rounded', colorByRoom(r)]"></div>
      <span>Ауд. {{ r }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>


