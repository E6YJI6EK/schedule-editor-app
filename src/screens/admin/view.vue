<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import * as authApi from '@/api/auth'
import type { AuthUser } from '@/api/auth'
import { useToast } from '@/core/ui/toast/model/hooks/useToast'

const router = useRouter()
const toast = useToast()

// Employee list
const employees = ref<AuthUser[]>([])
const loadingList = ref(false)
const confirmDeleteId = ref<number | null>(null)
const deleting = ref(false)

// Register form
const form = ref({ name: '', email: '', password: '', password_confirmation: '' })
const formErrors = ref<Record<string, string[]>>({})
const registering = ref(false)

const loadEmployees = async () => {
  loadingList.value = true
  try {
    const res = await authApi.listEmployees()
    employees.value = res.data
  } catch (err: any) {
    toast.error(err?.message || 'Ошибка загрузки сотрудников')
  } finally {
    loadingList.value = false
  }
}

const handleRegister = async () => {
  registering.value = true
  formErrors.value = {}
  try {
    await authApi.registerEmployee(form.value)
    toast.success('Сотрудник зарегистрирован')
    form.value = { name: '', email: '', password: '', password_confirmation: '' }
    await loadEmployees()
  } catch (err: any) {
    if (err?.errors) {
      formErrors.value = err.errors
    } else {
      toast.error(err?.message || 'Ошибка регистрации')
    }
  } finally {
    registering.value = false
  }
}

const handleDelete = async (id: number) => {
  deleting.value = true
  try {
    await authApi.deleteEmployee(id)
    employees.value = employees.value.filter(e => e.id !== id)
    confirmDeleteId.value = null
    toast.success('Сотрудник удалён')
  } catch (err: any) {
    toast.error(err?.message || 'Ошибка удаления')
  } finally {
    deleting.value = false
  }
}

onMounted(loadEmployees)
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
      <button
        @click="router.push('/schedule')"
        class="text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
      </button>
      <h1 class="text-xl font-bold text-gray-800">Панель администратора</h1>
    </div>

    <div class="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
      <!-- Register form -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Добавить сотрудника</h2>
        <form @submit.prevent="handleRegister" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="formErrors.name ? 'border-red-400' : 'border-gray-300'"
            />
            <p v-if="formErrors.name" class="text-xs text-red-600 mt-1">{{ formErrors.name[0] }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="formErrors.email ? 'border-red-400' : 'border-gray-300'"
            />
            <p v-if="formErrors.email" class="text-xs text-red-600 mt-1">{{ formErrors.email[0] }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="formErrors.password ? 'border-red-400' : 'border-gray-300'"
            />
            <p v-if="formErrors.password" class="text-xs text-red-600 mt-1">{{ formErrors.password[0] }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Подтверждение пароля</label>
            <input
              v-model="form.password_confirmation"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              :disabled="registering"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
            >
              {{ registering ? 'Регистрация...' : 'Добавить' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Employee list -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Сотрудники</h2>

        <div v-if="loadingList" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>

        <p v-else-if="employees.length === 0" class="text-center py-8 text-gray-500">
          Нет сотрудников
        </p>

        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="employee in employees"
            :key="employee.id"
            class="flex items-center justify-between py-3"
          >
            <div>
              <p class="font-medium text-gray-800">{{ employee.name }}</p>
              <p class="text-sm text-gray-500">{{ employee.email }}</p>
            </div>

            <div class="flex items-center gap-2">
              <template v-if="confirmDeleteId === employee.id">
                <span class="text-sm text-gray-600">Удалить?</span>
                <button
                  @click="handleDelete(employee.id)"
                  :disabled="deleting"
                  class="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  Да
                </button>
                <button
                  @click="confirmDeleteId = null"
                  class="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors"
                >
                  Нет
                </button>
              </template>
              <button
                v-else
                @click="confirmDeleteId = employee.id"
                class="px-3 py-1 bg-red-50 text-red-600 text-sm rounded-md hover:bg-red-100 border border-red-200 transition-colors"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
