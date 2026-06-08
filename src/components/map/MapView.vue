<template>
  <div class="relative w-full h-full">
    <div ref="mapContainer" class="w-full h-full" />

    <!-- Intensity legend -->
    <div class="absolute top-4 left-4 bg-surface border border-border rounded-md p-3 z-10">
      <div class="text-text-muted text-xs tracking-widest uppercase mb-2">Intensity Scale</div>
      <div class="flex flex-col gap-1.5">
        <div v-for="tier in tiers" :key="tier.label" class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full shrink-0" :style="{ backgroundColor: tier.color }" />
          <span class="text-text-muted text-xs uppercase tracking-wider">{{ tier.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useMapbox } from '../../composables/useMapbox'
import type { VolcanoEvent } from '../../composables/useUSGS'

const props = defineProps<{
  events: VolcanoEvent[]
  mapboxToken: string
}>()

const mapContainer = ref<HTMLElement | null>(null)
const { initMap, plotEvents } = useMapbox(props.mapboxToken)

const tiers = [
  { label: 'Significant', color: '#dc2626' },
  { label: 'Moderate', color: '#f97316' },
  { label: 'Light', color: '#f59e0b' },
  { label: 'Minor', color: '#4b5563' },
]

onMounted(() => {
  if (mapContainer.value) {
    initMap(mapContainer.value)
  }
})

// Re-plot markers whenever events change
watch(
  () => props.events,
  (newEvents) => {
    if (newEvents.length > 0) plotEvents(newEvents)
  }
)
</script>