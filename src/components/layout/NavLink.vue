<template>
  <RouterLink
    :to="to"
    class="flex items-center px-3 py-2 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors tracking-widest uppercase"
    activeClass="text-text-primary bg-white/5"
  >
    {{ label }}
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  label: string
}>()
</script>