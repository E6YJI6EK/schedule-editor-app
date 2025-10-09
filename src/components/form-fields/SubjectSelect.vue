<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Предмет</label>
    <Combobox v-model="selectedValue">
      <ComboboxAnchor class="w-full">
        <ComboboxInput 
          placeholder="Выберите или введите предмет" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ComboboxTrigger />
      </ComboboxAnchor>
      <ComboboxList class="w-[336px] max-h-[200px] overflow-auto">
        <ComboboxEmpty>Не найдено</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem 
            v-for="subject in subjects" 
            :key="subject" 
            :value="subject"
          >
            {{ subject }}
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Combobox,
  ComboboxAnchor,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
} from '@/components/ui/combobox';
import { subjects } from '@/data/selectOptions';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value || ''),
});
</script>
