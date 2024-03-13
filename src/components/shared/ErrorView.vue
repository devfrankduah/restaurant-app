<template>
  <div class="error-view">
    <div>
      <div class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          width="74"
          height="74"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </div>
    </div>
    <p>Error</p>
    <p v-if="message">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>
<style scoped>
.error-view {
  align-items: center;
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
