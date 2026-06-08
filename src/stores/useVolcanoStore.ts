import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUSGS, type VolcanoEvent } from '../composables/useUSGS'

export const useVolcanoStore = defineStore('volcano', () => {
  const { events, loading, error, fetchEvents } = useUSGS()

  const filters = ref({
    minMagnitude: 0,
    searchQuery: '',
  })

  const filteredEvents = computed(() => {
    return events.value.filter(e => {
      const matchesMag = e.magnitude >= filters.value.minMagnitude
      const matchesSearch = e.place
        .toLowerCase()
        .includes(filters.value.searchQuery.toLowerCase())
      return matchesMag && matchesSearch
    })
  })

  const eventsByMagnitude = computed(() => ({
    minor: filteredEvents.value.filter(e => e.magnitude < 2.5).length,
    light: filteredEvents.value.filter(e => e.magnitude >= 2.5 && e.magnitude < 4).length,
    moderate: filteredEvents.value.filter(e => e.magnitude >= 4 && e.magnitude < 6).length,
    significant: filteredEvents.value.filter(e => e.magnitude >= 6).length,
  }))

  function setFilter(key: keyof typeof filters.value, value: any) {
    filters.value[key] = value
  }

  function clearFilters() {
    filters.value = { minMagnitude: 0, searchQuery: '' }
  }

  return {
    events,
    loading,
    error,
    filters,
    filteredEvents,
    eventsByMagnitude,
    fetchEvents,
    setFilter,
    clearFilters,
  }
})