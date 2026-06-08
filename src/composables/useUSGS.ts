import { ref, computed } from 'vue'

export interface VolcanoEvent {
    id: string
    magnitude: number
    place: string
    time: number
    depth: number
    latitude: number
    longitude: number
    url: string
    title: string
}

export function useUSGS() {
    const events = ref<VolcanoEvent[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const recentEvents = computed(() => events.value.slice(0, 20))

    function normalizeEvent(feature: any): VolcanoEvent {
        return {
            id: feature.id,
            magnitude: feature.properties.mag ?? 0,
            place: feature.properties.place ?? 'Unknown',
            time: feature.properties.time,
            depth: feature.geometry.coordinates[2],
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
            url: feature.properties.url ?? '',
            title: feature.properties.title ?? '',
        }
    }

    async function fetchEvents() {
        loading.value = true
        error.value = null

        const params = new URLSearchParams({
            format: 'geojson',
            orderby: 'time',
            limit: '200',
            starttime: '2020-01-01',
            minmagnitude: '1',
        })

        // Cast a wide net - volcanic regions world-wide
        const urls = [
            `https://earthquake.usgs.gov/fdsnws/event/1/query?${params}&eventtype=volcanic%20eruption`,
            `https://earthquake.usgs.gov/fdsnws/event/1/query?${params}&eventtype=earthquake&latitude=19.4&longitude=-155.3&maxradiuskm=200`,  // Hawaii
            `https://earthquake.usgs.gov/fdsnws/event/1/query?${params}&eventtype=earthquake&latitude=64.6&longitude=-17.5&maxradiuskm=150`,  // Iceland
        ]

        try {
            const responses = await Promise.all(urls.map(u => fetch(u)))
            const jsons = await Promise.all(responses.map(r => r.json()))

            const seen = new Set<string>()
            const all: VolcanoEvent[] = []

            for (const data of jsons) {
                for (const feature of data.features ?? []) {
                    if (!seen.has(feature.id)) {
                        seen.add(feature.id)
                        all.push(normalizeEvent(feature))
                    }
                }
            }

            all.sort((a, b) => b.time - a.time)
            events.value = all
        } catch (e) {
            error.value = 'Failed to fetch seismic data'
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    return { events, loading, error, recentEvents, fetchEvents }
}