import type { Dish } from '@/types'
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
export function useSingleDish(id: string): UseQueryReturnType<Dish | null, Error> {
  const getRequest = useGetRequest
  const queryClient = useQueryClient()

  const listQueryState = queryClient.getQueryState(['dishes'])
  let initialDataOptions = {}
  if (listQueryState && listQueryState?.dataUpdatedAt) {
    initialDataOptions = {
      initialData: () => {
        const dishes = queryClient.getQueryData<Dish[]>(['dishes'])
        const targetDish = dishes?.find((dish) => dish.id === id)
        return targetDish || null
      },
      initialDataUpdatedAt: () => {
        return queryClient.getQueryState(['dishes'])?.dataUpdatedAt
      }
    }
  }
  const request = useQuery({
    queryKey: ['dish', 'single', id],
    queryFn: async () => {
      if (!id) {
        return null
      }
      const { data = null } = await getRequest<Dish>(`/dishes/${id}`)
      return data
    },
    ...initialDataOptions,
    refetchOnWindowFocus: false,
    enabled: !!id.trim(),
    select: (data) => {
      if (!data) return null
      return {
        id: data.id,
        name: data.name,
        description: data.description
      } as Dish
    },
    staleTime: 1000 * 60 * 5
  })
  return request
}
