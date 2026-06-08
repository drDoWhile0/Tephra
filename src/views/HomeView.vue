<template>
  <div class="p-8">
    <div v-if="store.loading" class="text-text-muted text-sm">Loading...</div>
    <div v-else-if="store.error" class="text-danger text-sm">{{ store.error }}</div>
    <div v-else class="text-text-muted text-sm">
      {{ store.filteredEvents.length }} events loaded
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useVolcanoStore } from '../stores/useVolcanoStore'

const store = useVolcanoStore()

onMounted(() => {
  store.fetchEvents()
})
</script>