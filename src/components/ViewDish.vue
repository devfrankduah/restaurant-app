<template>
  <div class="view">
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          {{ data ? data.name : '' }}
        </div>
        <label for="description" class="label">Description</label>
        <div class="control">
          {{ data ? data.description : '' }}
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="edit" class="button is-success">Edit</button>
          <button @click="back" class="button is-light">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import router from '@/router'
import { useSingleDish } from '@/composables/query/singleDish'
import { useRoute } from 'vue-router'

const route = useRoute()

const dishId = computed(() => route.params.id as string)

const { data } = useSingleDish(dishId.value)

const edit = () => {
  router.push(`/dishes/${dishId.value}/edit`)
}
const back = () => {
  router.push('/dishes')
}
const elDishNameInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  elDishNameInput.value?.focus()
})
</script>
<style scoped>
.view {
  padding: 10px;
  margin: 20px;
}
</style>
