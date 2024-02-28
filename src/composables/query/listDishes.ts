import type { Dish } from '@/types'
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
export function useListDishesQuery(): UseQueryReturnType<Dish[], Error> {
  const request = useQuery({
    queryKey: ['dishes'],
    queryFn: async () => {
      const { data } = await useGetRequest<Dish[]>(`/dishes`)
      return data
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    select: (data) => data,
    staleTime: 1000 * 60 * 5
  })
  return request
}
