<template>
  <div class="flex flex-col h-full border-t border-border">
    <!-- Filter bar -->
    <div class="flex items-center gap-4 px-6 py-3 border-b border-border shrink-0">
      <div class="flex items-center gap-2">
        <label class="text-text-muted text-xs tracking-widest uppercase">Magnitude</label>
        <select
          :value="store.filters.minMagnitude"
          @change="e => store.setFilter('minMagnitude', Number((e.target as HTMLSelectElement).value))"
          class="bg-surface border border-border text-text-primary text-xs rounded px-2 py-1.5 focus:outline-none"
        >
          <option value="0">All Magnitudes</option>
          <option value="2.5">2.5+</option>
          <option value="4">4.0+</option>
          <option value="6">6.0+</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <label class="text-text-muted text-xs tracking-widest uppercase">Search</label>
        <input
          :value="store.filters.searchQuery"
          @input="e => store.setFilter('searchQuery', (e.target as HTMLInputElement).value)"
          placeholder="Filter by location..."
          class="bg-surface border border-border text-text-primary text-xs rounded px-2 py-1.5 w-48 focus:outline-none placeholder:text-text-muted"
        />
      </div>

      <span class="ml-auto text-text-muted text-xs font-mono-data">
        {{ store.filteredEvents.length }} events found
      </span>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-y-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="sticky top-0 bg-bg z-10">
          <tr class="border-b border-border">
            <th class="text-left px-6 py-2 text-text-muted text-xs tracking-widest uppercase font-normal">Location</th>
            <th class="text-left px-4 py-2 text-text-muted text-xs tracking-widest uppercase font-normal">Mag</th>
            <th class="text-left px-4 py-2 text-text-muted text-xs tracking-widest uppercase font-normal">Depth</th>
            <th class="text-left px-4 py-2 text-text-muted text-xs tracking-widest uppercase font-normal">Time (UTC)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="event in pagedEvents"
            :key="event.id"
            class="border-b border-border hover:bg-white/5 transition-colors cursor-pointer"
          >
            <td class="px-6 py-3">
              <div class="flex items-center gap-2">
                <span
                  class="w-2 h-2 rounded-full shrink-0"
                  :style="{ backgroundColor: dotColor(event.magnitude) }"
                />
                <span class="text-text-primary text-xs">{{ event.place }}</span>
              </div>
            </td>
            <td class="px-4 py-3">
              <MagnitudeBadge :magnitude="event.magnitude" />
            </td>
            <td class="px-4 py-3 text-text-muted text-xs font-mono-data">{{ event.depth.toFixed(1) }} km</td>
            <td class="px-4 py-3 text-text-muted text-xs font-mono-data">{{ formatTime(event.time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-end gap-1 px-6 py-3 border-t border-border shrink-0">
      <button
        @click="page--"
        :disabled="page === 1"
        class="px-3 py-1 text-xs border border-border rounded text-text-muted hover:text-text-primary hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>

      <button
        v-for="(p, i) in visiblePages"
        :key="i"
        :disabled="p === '...'"
        @click="typeof p === 'number' && (page = p)"
        class="px-3 py-1 text-xs border rounded transition-colors"
        :class="p === page
          ? 'border-white/20 text-text-primary bg-white/5'
          : p === '...'
            ? 'border-transparent text-text-muted cursor-default'
            : 'border-border text-text-muted hover:text-text-primary hover:border-white/20'"
      >
        {{ p }}
      </button>

      <button
        @click="page++"
        :disabled="page === totalPages"
        class="px-3 py-1 text-xs border border-border rounded text-text-muted hover:text-text-primary hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useVolcanoStore } from '../../stores/useVolcanoStore'
import MagnitudeBadge from '../shared/MagnitudeBadge.vue'

const store = useVolcanoStore()

const PAGE_SIZE = 6
const page = ref(1)

watch(() => store.filteredEvents, () => { page.value = 1 })

const totalPages = computed(() =>
  Math.max(1, Math.ceil(store.filteredEvents.length / PAGE_SIZE))
)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = page.value
  const pages: (number | '...')[] = []

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)

  return pages
})

const pagedEvents = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return store.filteredEvents.slice(start, start + PAGE_SIZE)
})

function dotColor(mag: number): string {
  if (mag >= 6) return '#dc2626'
  if (mag >= 4) return '#f97316'
  if (mag >= 2.5) return '#f59e0b'
  return '#4b5563'
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toUTCString().slice(5, 22)
}
</script>