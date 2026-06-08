<template>
  <span
    class="inline-block font-mono-data text-xs px-2 py-0.5 rounded"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    M{{ magnitude.toFixed(1) }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ magnitude: number }>()

const bgColor = computed(() => {
  if (props.magnitude >= 6) return 'rgba(220, 38, 38, 0.2)'
  if (props.magnitude >= 4) return 'rgba(249, 115, 22, 0.2)'
  if (props.magnitude >= 2.5) return 'rgba(245, 158, 11, 0.2)'
  return 'rgba(75, 85, 99, 0.2)'
})

const textColor = computed(() => {
  if (props.magnitude >= 6) return '#dc2626'
  if (props.magnitude >= 4) return '#f97316'
  if (props.magnitude >= 2.5) return '#f59e0b'
  return '#6b6b7b'
})
</script>