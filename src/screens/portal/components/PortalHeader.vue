<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/screens/auth/model/authStore'

const authStore = useAuthStore()
const router = useRouter()

const roleLabel: Record<string, string> = {
  ADMIN: 'Администратор',
  EMPLOYEE: 'Сотрудник',
}

async function handleLogout() {
  await authStore.logout()
  router.push('/portal')
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold text-blue-600 tracking-tight">VavilovRasp</span>
      </div>

      <div v-if="authStore.isAuthenticated && authStore.user" class="flex items-center gap-4">
        <div class="text-right">
          <p class="text-sm font-medium text-gray-800">{{ authStore.user.name }}</p>
          <p class="text-xs text-gray-500">{{ roleLabel[authStore.user.role] ?? authStore.user.role }}</p>
        </div>
        <button
          class="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          @click="handleLogout"
        >
          Выйти
        </button>
      </div>

      <div v-else>
        <router-link
          to="/login"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Вход для сотрудников
        </router-link>
      </div>
    </div>
  </header>
</template>
