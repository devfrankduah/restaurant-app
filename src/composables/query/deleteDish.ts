import type { Dish } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
export function useDeleteDish() {
  const request = useDeleteRequest
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['dish', 'delete'],
    mutationFn: async (id?: string) => {
      await request(`/dishes/${id}`)
      return id
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: ['dishes'],
        refetchType: 'active'
      }),
        queryClient.cancelQueries({ queryKey: ['dish', 'single', id] }),
        queryClient.setQueryData(['dish', 'single', id], null)
      if (id) {
        removeDish(id, queryClient)
      }
    }
  })
  return mutation
}

export function removeDish(id: string, queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.setQueryData(['dishes'], (dishes: Dish[] | undefined) => {
    if (!dishes) {
      return undefined
    }
    return dishes.filter((dish) => dish.id !== id)
  })
}
