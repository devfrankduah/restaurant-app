import type { dietList, restaurantStatusList } from '@/constants'
import type { MutationObserverResult } from '@tanstack/vue-query'
type DistributiveOmit<T, K extends string | number | symbol> = T extends any ? Omit<T, K> : never
export type MutationResult<TData, TError, TVariables, TContext> = DistributiveOmit<
  MutationObserverResult<TData, TError, TVariables, TContext>,
  'mutate' | 'reset'
>

export type Dish = {
  id: string
  name: string
  status: Status
  diet?: Diet
  description?: string
}

export type Restaurant = {
  id: string
  name: string
  address: string
  website: string
  status: Status
  diet?: Diet
}

type Status = (typeof restaurantStatusList)[number]
type Diet = (typeof dietList)[number]
