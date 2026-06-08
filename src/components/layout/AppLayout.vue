<template>
  <div class="flex h-screen w-screen overflow-hidden bg-bg">
    <AppSidebar />
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Header -->
      <header class="flex items-center justify-between px-6 h-12 border-b border-border shrink-0">
        <span class="text-text-primary text-sm font-medium tracking-widest uppercase">
          {{ title }}
        </span>
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono-data text-green-400 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
            SYSTEM LIVE
          </span>
        </div>
      </header>
      <!-- Main content -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'

defineProps<{
  title?: string
}>()
</script>