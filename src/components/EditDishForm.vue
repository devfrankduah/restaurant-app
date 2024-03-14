<template>
  <LoadingView v-if="isPending" />
  <form v-else @submit.prevent class="editform">
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="newStuff.name"
            type="text"
            class="input is-large"
            :placeholder="data ? data.name : ''"
            ref="elDishNameInput"
          />
        </div>
        <label for="description" class="label">Description</label>
        <div class="control">
          <input
            v-model="newStuff.description"
            type="text"
            class="input is-large"
            :placeholder="data ? data.description : ''"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button :disabled="hasUpdates" @click="updateDish" class="button is-success">Save</button>
          <button @click="cancelEdit" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { Dish } from '@/types'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useUpdateDish } from '@/composables/query/addOrUpdateDish'
import { useSingleDish } from '@/composables/query/singleDish'
import { useToast } from 'vue-toast-notification'
import LoadingView from './shared/LoadingView.vue'

const $toast = useToast()
const toastOptions = {
  position: 'top' as 'top',
  duration: 3000,
  dismissible: true
}
const route = useRoute()

const dishId = computed(() => route.params.id as string)

const { data } = useSingleDish(dishId.value)

const newStuff = reactive({
  name: data.value?.name,
  status: 'Want to Try',
  diet: '',
  description: data.value?.description
})
const { isPending, mutateAsync } = useUpdateDish()

const updatedDish = computed(() => {
  return {
    updates: { ...newStuff } as Partial<Dish>,
    id: dishId.value
  }
})

const hasUpdates = computed(() => {
  return newStuff.name === data.value?.name && newStuff.description === data.value?.description
})

const updateDish = async () => {
  await mutateAsync(updatedDish.value, {
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
.editform {
  padding: 10px;
  margin: 20px;
}
</style>
