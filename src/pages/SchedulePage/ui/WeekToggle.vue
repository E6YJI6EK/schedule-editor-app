<script setup lang="ts">
import type { WeekType } from '@/pages/SchedulePage/model/types'

const props = defineProps<{
  modelValue: WeekType
}>()
const emit = defineEmits<{ (e: 'update:modelValue', v: WeekType): void }>()

function set(v: WeekType) {
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="inline-flex items-center rounded border p-1 gap-1 bg-white">
    <button :class="['px-3 py-1 rounded', modelValue==='odd' ? 'bg-black text-white' : '']" @click="set('odd')">Нечётная</button>
    <button :class="['px-3 py-1 rounded', modelValue==='even' ? 'bg-black text-white' : '']" @click="set('even')">Чётная</button>
  </div>
</template>

<style scoped>
</style>


