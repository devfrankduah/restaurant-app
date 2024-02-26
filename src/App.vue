<template>
  <TheNavbar tagline="Track whatever you want to eat!" />
  <RouterView />
  <VueQueryDevtools />
</template>
<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>
<style></style>
