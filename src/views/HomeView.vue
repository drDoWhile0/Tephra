<template>
  <div class="p-8">
    <div v-if="loading" class="text-text-muted text-sm">Loading...</div>
    <div v-else-if="error" class="text-danger text-sm">{{ error }}</div>
    <div v-else class="text-text-muted text-sm">
      {{ events.length }} events loaded
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUSGS } from '../composables/useUSGS'

const { events, loading, error, fetchEvents } = useUSGS()

// Vue equivalent of useEffect(() => { fetchEvents() }, [])
onMounted(() => {
  fetchEvents()
})
</script>