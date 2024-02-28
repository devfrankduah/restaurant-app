import type { Dish } from '@/types'
import { useMutation, useQueryClient, type UseMutationReturnType } from '@tanstack/vue-query'
export function useAddDish(): UseMutationReturnType<Dish, Error, Dish, unknown> {
  const request = usePostRequest
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['dish', 'add'],
    mutationFn: async (dish: Dish) => {
      const res = await request<Dish>(`/dishes`, dish)
      return res.data
    },
    onSuccess: (data) => {
      if (data && data.id) {
        queryClient.setQueryData<Dish[]>(['dishes'], (dishes) => {
          if (dishes) {
            return [...dishes, data]
          }
          return []
        })
        queryClient.setQueryData<Dish>(['dish', 'single', data.id], Object.assign({}, data))
      }
    }
  })
  return mutation
}

export function useUpdateDish(): UseMutationReturnType<
  Dish,
  Error,
  { id: string; updates: Partial<Dish> },
  unknown
> {
  const request = usePutRequest
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['dish', 'update'],
    mutationFn: async (data: { id: Dish['id']; updates: Partial<Dish> }) => {
      const res = await request<Dish>(`/dishes/${data.id}`, data.updates)
      return res.data
    },
    onSuccess(data) {
      if (data) {
        queryClient.setQueryData(['dish', 'single', data.id], data)
        queryClient.invalidateQueries({
          queryKey: ['dishes'],
          refetchType: 'active'
        })
      }
    }
  })
  return mutation
}
