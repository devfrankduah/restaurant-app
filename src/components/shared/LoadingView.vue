<template>
  <div class="loading-view">
    <div role="status">
      <div class="loader"></div>
      <span class="loading">Loading...</span>
    </div>
    <div>
      {{ title }}
    </div>
    <p>{{ loadingText }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loadingText?: string
  title?: string
  titleClass?: string
}>()
</script>
<style scoped>
.loading-view {
  margin: 20px;
  align-items: center;
  position: relative;
  inset: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #000000;
  width: 100px;
  height: 100px;
  -webkit-animation: spin 2s linear infinite; 
  animation: spin 2s linear infinite;
  position: inherit;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
