<template>
  <article class="box dish-list">
    <div class="media" @click="viewDish">
      <aside class="media-left">
        <img src="../assets/images/burger.jpg" width="100" height="100" alt="" />
      </aside>
      <div class="media-content">
        <p class="title is-5 is-spaced mb-2">Name: {{ dish.name }}</p>
        <p class="title is-7 is-spaced mb-1">Description: {{ dish.description }}</p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ dish.status }}</span>
        </p>
      </div>
    </div>
    <div>
      <RouterLink :to="`/dishes/${dish.id}/edit`" class="button is-small is-warning is-light"
        >Edit</RouterLink
      >
      <button @click="deleteDish(dish.id)" class="button is-small is-danger is-light">
        {{ isDeleting ? 'Deleting...' : 'Delete' }}
      </button>
    </div>
  </article>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Dish } from '@/types'
import { useDeleteDish } from '@/composables/query/deleteDish'
import router from '@/router'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const toastOptions = {
  position: 'top' as 'top',
  duration: 3000,
  dismissible: true
}
type PropTypes = {
  dish: Dish
}

const props = defineProps<PropTypes>()

const { mutateAsync: deleteFn, isPending: isDeleting } = useDeleteDish()

const statusColor = computed(() => {
  switch (props.dish.status) {
    case 'Want to Try':
      return 'is-warning'
    case 'Recommended':
      return 'is-success'
    case 'Do Not Recommend':
      return 'is-danger'
    default:
      return ''
  }
})

const deleteDish = async (id: string) => {
  if (!confirm('Are you sure you want to delete?!')) {
    return
  }
  if (isDeleting.value) {
    return
  }
  await deleteFn(id, {
    onSuccess: async () => {
      $toast.success('Successfully deleted dish', toastOptions)
    },
    onError: (error) => {
      if (error) {
        $toast.error('Error deleting dish, please try again', toastOptions)
      }
    }
  })
}
const viewDish = () => {
  router.push(`/dishes/${props.dish.id}`)
}
</script>

<style></style>
