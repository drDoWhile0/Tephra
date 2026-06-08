# Tephra

A professional volcanic and seismic activity monitoring dashboard built for real-time situational awareness. Tephra aggregates live data from the USGS Earthquake API and presents it through an interactive 3D globe, filterable activity feed, per-volcano detail views, and a global insights dashboard.

---

## Features

- **Interactive 3D Globe** — Mapbox GL globe projection with atmospheric fog and star field. Seismic events plotted as color-coded markers scaled by magnitude, with popup detail on click.
- **Live USGS Data** — Pulls from the USGS Earthquake API across multiple volcanic regions worldwide. No API key required for data.
- **Activity Feed** — Filterable, searchable table of recent events with magnitude badges, depth, region, and timestamp. Debounced search for performance.
- **Volcano Detail View** — Per-volcano page with stat cards (total events, average magnitude, last active), ECharts seismic activity timeline, and chronological event log.
- **Insights Dashboard** — Global trend analysis with ECharts line, bar, and donut charts broken down by region, magnitude tier, and time window.
- **Magnitude Color System** — Consistent severity encoding across map markers, table badges, and chart series:
  - `< 2.5` — Minor (gray)
  - `2.5 – 4` — Light (amber)
  - `4 – 6` — Moderate (orange)
  - `6+` — Significant (red)

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Vue 3 + TypeScript | Composition API, strong typing |
| Build | Vite | Fast HMR, first-class Vue support |
| Styling | Tailwind CSS v4 | Utility-first, dark UI at speed |
| State | Pinia | Vue's official state manager |
| Routing | Vue Router 4 | Standard, lazy-loaded routes |
| Map | Mapbox GL JS | Globe projection, dark basemap |
| Charts | Apache ECharts | Enterprise-grade, highly configurable |
| Data | USGS Earthquake API | Free, no key, clean GeoJSON |
| Deployment | Netlify | Vite-optimized, instant deploys |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Mapbox access token](https://account.mapbox.com/)

### Installation

```bash
git clone https://github.com/drDoWhile0/Tephra.git
cd Tephra
npm install
```

### Configuration

Add your Mapbox token to `src/views/HomeView.vue`:

```ts
const MAPBOX_TOKEN = 'your-mapbox-token-here'
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
  components/
    layout/       # AppLayout, AppSidebar, NavLink
    map/          # MapView, VolcanoMarker, MarkerPopup
    charts/       # ActivityChart, GlobalTrendChart, RegionBreakdown, MagnitudeDonut
    shared/       # LoadingSkeleton, EmptyState, ErrorState
  composables/
    useUSGS.ts    # USGS API fetch and normalization
    useMapbox.ts  # Map initialization and marker management
    useInsights.ts # Heuristic insight generation
    useDebounce.ts # Debounced search input
  stores/
    useVolcanoStore.ts  # Pinia global state
  views/
    HomeView.vue          # Map + Activity Feed
    VolcanoDetailView.vue # Per-volcano detail
    InsightsView.vue      # Global dashboard
  router/
    index.ts
  types/
  App.vue
  main.ts
```

---

## Data Source

All seismic data is sourced from the [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/fdsnws/event/1/). The API is free, requires no authentication, and returns GeoJSON with magnitude, location, depth, time, and event classification.

Tephra queries multiple regional endpoints in parallel and deduplicates results client-side, casting a wide net across known volcanic zones including Hawaii, Iceland, the Pacific Ring of Fire, and the Mediterranean.

---

## Design

Tephra follows a **data-forward, minimal chrome** aesthetic — near-black backgrounds, surface cards with just enough contrast, color used only where it carries meaning. Typography uses Inter for UI text and JetBrains Mono for all data values.

Inspired by the Linear.app dashboard design language applied to a scientific monitoring context.

---

## License

MIT
