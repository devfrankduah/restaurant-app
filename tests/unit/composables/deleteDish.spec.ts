import { afterEach, describe, expect, test, vi, it } from 'vitest'
import { MockDb } from '../../_mocks_/db'
import { withSetup } from '../../_utils_/withSetup'
import { createBaseDishObject } from '../../_mocks_/newDish'
import { useDeleteDish } from '../../../src/composables/query/deleteDish'
import { useListDishesQuery } from '../../../src/composables/query/listDishes'
import { useSingleDish } from '../../../src/composables/query/singleDish'
import { wait } from '../../_utils_/wait'

describe('Composables: useDeleteDish', () => {
  const db = new MockDb()
  const VITE_BASE_API = 'http://localhost:3001'
  const mockDish = { ...createBaseDishObject() }
  afterEach(() => {
    vi.restoreAllMocks()
    db.removeAll()
  })
  test('should delete a dish successfully', async () => {
    db.add(mockDish)
    const [mutation] = withSetup(useDeleteDish)
    expect(mutation).toBeTruthy()
    await mutation.mutateAsync(mockDish.id)
    expect(db.get(mockDish.id)).toBeUndefined()
  })
  test('should remove cached entry after deletion', async () => {
    const mockDish2 = { ...createBaseDishObject() }
    db.add(mockDish)
    db.add(mockDish2)
    const [composables] = withSetup(() => {
      const deletionMutation = useDeleteDish()
      const listDishesQuery = useListDishesQuery()
      const singleDishQuery = useSingleDish(mockDish.id)
      return { deletionMutation, listDishesQuery, singleDishQuery }
    })
    const { deletionMutation, listDishesQuery, singleDishQuery } = composables
    await listDishesQuery.refetch()
    await singleDishQuery.refetch()
    await deletionMutation.mutateAsync(mockDish.id)
    await wait(1000)
    expect(listDishesQuery.data.value).toHaveLength(1)
    expect(singleDishQuery.data.value).toEqual(null)
  })
  it('should cancel queries for a resource after its deletion', async () => {
    const mockDish2 = { ...createBaseDishObject() }
    db.add(mockDish)
    db.add(mockDish2)
    const spy = vi.spyOn(console, 'log')
    const [composables] = withSetup(() => {
      const deletionMutation = useDeleteDish()
      const singleDishQuery = useSingleDish(mockDish.id)
      return { deletionMutation, singleDishQuery }
    })
    const { deletionMutation, singleDishQuery } = composables
    expect(singleDishQuery.isFetching.value).toBe(true)
    await deletionMutation.mutateAsync(mockDish.id)
    expect(db.getAll()).toHaveLength(1)
    expect(spy).toHaveBeenCalledWith(
      'MSW intercepted:',
      'DELETE',
      `${VITE_BASE_API}/dishes/${mockDish.id}`
    )
    expect(singleDishQuery.isFetching.value).toBe(false)
    expect(singleDishQuery.isPending.value).toBe(false)
  })
})
