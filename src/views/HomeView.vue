<template>
  <div class="flex flex-col h-full">
    <!-- Map takes upper portion -->
    <div class="h-[70%] w-full">
      <MapView
        v-if="!store.loading && store.events.length > 0"
        :events="store.filteredEvents"
        :mapbox-token="MAPBOX_TOKEN"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-text-muted text-sm">
        {{ store.loading ? 'Loading events...' : store.error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useVolcanoStore } from '../stores/useVolcanoStore'
import MapView from '../components/map/MapView.vue'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const store = useVolcanoStore()

onMounted(() => {
  store.fetchEvents()
})
</script>