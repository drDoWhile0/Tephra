import { defineStore } from 'pinia';
import { ref, computed } from 'vue'

export const useVolcanoStore = defineStore('volcano', () => {
    // State
    const events = ref<any[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Getters (computed = useMemo in react)
    const recentEvents = computed(() =>
        events.value.slice(0, 20)
    )

    // Actions
    async function fetchEvents () {
        loading.value = true
        error.value = null
        try {
            const res = await fetch(
                'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=volcanic%20eruption&orderby=time&limit=100&starttime=2026-01-01'
            )
            const data = await res.json()
            events.value = data.features
        } catch (e) {
            error.value = 'Failed to fetch volcanic and seismic events'
        } finally {
            loading.value = false
        }
    }

    return { events, loading, error, recentEvents, fetchEvents }
})