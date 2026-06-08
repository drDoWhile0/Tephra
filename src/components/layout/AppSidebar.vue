<template>
  <aside class="flex flex-col w-56 h-screen bg-surface border-r border-border shrink-0">
    <!-- Logo -->
    <div class="px-5 py-4 border-b border-border">
        <span class="text-text-primary font-semibold tracking-widest text-sm uppercase">Tephra</span>
    </div>

    <!-- Nav -->
    <nav class="flex flex-col gap-0.5 p-3 flex-1">
        <NavLink to="/" label="Monitoring" />
        <NavLink to="/insights" label="Insights" />
    </nav>

    <!-- Footer -->
    <div class="px-5 py-4 border-t border-border">
      <span class="text-text-muted text-xs">USGS Live Data</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue'
</script>