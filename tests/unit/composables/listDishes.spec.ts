import { describe, expect, test } from 'vitest'
import { MockDb } from '../../_mocks_/db'
import { withSetup } from '../../_utils_/withSetup'
import { useListDishesQuery } from '../../../src/composables/query/listDishes'
import { createBaseDishObject } from '../../_mocks_/newDish'

import { wait } from '../../_utils_/wait'
describe('Composables: useListDishesQuery', () => {
  const db = new MockDb()
  test('should return an empty array if there are no dishes', async () => {
    const [result] = withSetup(() => useListDishesQuery())
    expect(result).toBeTruthy()
    expect(result.isLoading.value).toBe(true)
    await wait(1000)
    expect(result.isLoading.value).toBe(false)
    expect(result.data.value).toHaveLength(0)
  })
  test('should return a list of dishes', async () => {
    for (let i = 0; i < 10; i++) {
      db.add({ ...createBaseDishObject() })
    }
    const [result, _app] = withSetup(() => useListDishesQuery())
    expect(result).toBeTruthy()
    expect(result.isLoading.value).toBe(true)
    await wait(1000)
    expect(result.isLoading.value).toBe(false)
    expect(result.data.value).toHaveLength(10)
  })
})
