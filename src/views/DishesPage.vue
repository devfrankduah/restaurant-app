<template>
  <main class="section">
    <div class="columns">
      <SideMenu />
      <ErrorView v-if="isError" />
      <div v-else class="column">
        <h1 class="title">Dishes</h1>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <RouterLink :to="`/dishes/new`" class="button is-success">New</RouterLink>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Press enter to search"
                    :value="filterText"
                    @keyup.enter="updateFilterText"
                  />
                </p>
              </div>
            </div>
          </div>
        </nav>
        <LoadingView v-if="isFetching" />
        <NoItem v-else-if="numberOfDishes === 0" />
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import type { Dish } from '@/types'
import { useListDishesQuery } from '@/composables/query/listDishes'
import ErrorView from '@/components/shared/ErrorView.vue'
import NoItem from '@/components/shared/NoItem.vue'
import LoadingView from '@/components/shared/LoadingView.vue'

const { data, isError, isFetching } = useListDishesQuery()
const filterText = ref('')

const dishList = computed(() => data.value)

const filteredDishList = computed((): Dish[] | undefined => {
  return dishList?.value?.filter((dish: Dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishList.value
    }
  })
})
const numberOfDishes = computed(() => {
  return filteredDishList?.value?.length
})

const updateFilterText = (event: KeyboardEvent) => {
  filterText.value = (event.target as HTMLInputElement).value
}
</script>
