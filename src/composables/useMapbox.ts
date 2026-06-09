import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import type { VolcanoEvent } from './useUSGS'

export function useMapbox(token: string) {
    const map = ref<mapboxgl.Map | null>(null)

    function getMagnitudeColor(mag: number): string {
        if (mag >= 6) return '#dc2626'
        if (mag >= 4) return '#f97316'
        if (mag >= 2.5) return '#f59e0b'
        return '#4b5563'
    }

    function initMap(container: HTMLElement) {
        mapboxgl.accessToken = token

        map.value = new mapboxgl.Map({
            container,
            style: 'mapbox://styles/mapbox/dark-v11',
            projection: 'globe',
            zoom: 1.5,
            center: [0, 20],
        })

        (map.value as any).on('style.load', () => {
            // Atmosphere effect on the globe
            map.value!.setFog({
                color: 'rgb(20, 20, 32)',
                'high-color': 'rgb(40, 40, 80)',
                'horizon-blend': 0.02,
                'space-color': 'rgb(13, 13, 20)',
                'star-intensity': 0.6,
            })
        })
    }

    function plotEvents(events: VolcanoEvent[]) {
        if (!map.value) return

        // Remove existing markers if re-plotting
        const existing = document.querySelectorAll('.volcano-marker')
        existing.forEach(el => el.remove())

        events.forEach(event => {
            const el = document.createElement('div')
            el.className = 'volcano-marker'
            el.style.cssText = `
                width: ${Math.max(8, event.magnitude * 4)}px;
                height: ${Math.max(8, event.magnitude * 4)}px;
                border-radius: 50%;
                background-color: ${getMagnitudeColor(event.magnitude)};
                opacity: 0.85;
                cursor: pointer;
                border: 1px solid rgba(255,255,255,0.2);
            `

            new mapboxgl.Marker({ element: el })
                .setLngLat([event.longitude, event.latitude])
                .setPopup(
                new mapboxgl.Popup({ offset: 12, className: 'tephra-popup' }).setHTML(`
                    <div style="font-family: Inter, sans-serif; padding: 4px;">
                    <div style="font-size: 11px; color: #6b6b7b; text-transform: uppercase; letter-spacing: 0.1em;">
                        ${event.magnitude >= 6 ? 'Significant' : event.magnitude >= 4 ? 'Moderate' : event.magnitude >= 2.5 ? 'Light' : 'Minor'}
                    </div>
                    <div style="font-size: 13px; color: #e2e2e8; margin: 4px 0;">${event.place}</div>
                    <div style="font-size: 12px; color: #f59e0b; font-family: 'JetBrains Mono', monospace;">
                        M${event.magnitude.toFixed(1)} · ${event.depth.toFixed(1)}km depth
                    </div>
                    </div>
                `)
                )
                .addTo(map.value as any)
        })
    }

    onMounted(() => {
        map.value?.remove()
    })

    return { map, initMap, plotEvents, getMagnitudeColor }
}