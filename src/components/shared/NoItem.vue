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
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
    </div>
    <p>No items</p>

  </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
.error-view {
  align-items: center;
  position: relative;
  inset: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
