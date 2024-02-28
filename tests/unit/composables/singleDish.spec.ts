import { afterEach, describe, expect, test, vi, it } from 'vitest'
import { MockDb } from '../../_mocks_/db'
import { withSetup } from '../../_utils_/withSetup'
import { createBaseDishObject } from '../../_mocks_/newDish'
import { useSingleDish } from '../../../src/composables/query/singleDish'
import { wait } from '../../_utils_/wait'

describe('Composables: useSingleDish', () => {
  const db = new MockDb()
  const VITE_BASE_API = 'http://localhost:3001'

  const mockDish = { ...createBaseDishObject() }
  afterEach(() => {
    vi.restoreAllMocks()
    db.removeAll()
  })
  test('should get a dish by id', async () => {
    db.add(mockDish)
    const [composable] = withSetup(() => useSingleDish(mockDish.id))
    expect(composable).toBeTruthy()
    expect(composable.isFetching.value).toBe(true)
    await wait(1000)
    expect(composable.isFetching.value).toBe(false)
    expect(composable.data.value.id).toEqual(mockDish.id)
    expect(composable.data.value.description).toEqual(mockDish.description)
    expect(composable.data.value.name).toEqual(mockDish.name)
  })
  it('should not make a request if id is not provided', async () => {
    const spy = vi.spyOn(console, 'log')
    const EMPTY_ID = ''
    const [composable] = withSetup(() => useSingleDish(EMPTY_ID))
    expect(composable).toBeTruthy()
    expect(composable.isFetching.value).toBe(false)
    expect(composable.isPending.value).toBe(true)
    expect(composable.data.value).toBeUndefined()
    expect(spy).not.toHaveBeenCalledWith(
      'MSW intercepted:',
      'GET',
      `${VITE_BASE_API}/dishes/${EMPTY_ID}`
    )
  })
})
