<template>
  <LoadingView v-if="isPending" />
  <form v-else @submit.prevent class="newform">
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="newDish.name"
            type="text"
            class="input is-large"
            placeholder=""
            ref="elDishNameInput"
          />
        </div>
        <label for="description" class="label">Description</label>
        <div class="control">
          <input v-model="newDish.description" type="text" class="input is-large" placeholder="" />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="addDish(newDish)" class="button is-success">Create</button>
          <button @click="cancelEdit" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Dish } from '@/types'
import router from '@/router'
import { useAddDish } from '@/composables/query/addOrUpdateDish'
import LoadingView from './shared/LoadingView.vue'
import { useToast } from 'vue-toast-notification'

const { isPending, mutateAsync } = useAddDish()
const $toast = useToast()
const toastOptions = {
  position: 'top' as 'top',
  duration: 3000,
  dismissible: true
}

const newDish = ref<Dish>({
  id: uuidv4(),
  name: '',
  status: 'Want to Try',
  diet: '',
  description: ''
})

const addDish = async (payload: Dish) => {
  await mutateAsync(payload, {
    onSuccess: () => {
      $toast.success('Successfully added new dish', toastOptions)
      router.push('/dishes')
    },
    onError: (error) => {
      if (error) {
        $toast.error('Error adding dish, please try again', toastOptions)
      }
    }
  })
}
const cancelEdit = () => {
  router.push('/dishes')
}
const elDishNameInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  elDishNameInput.value?.focus()
})
</script>

<style scoped>
.newform {
  padding: 10px;
  margin: 20px;
}
</style>
