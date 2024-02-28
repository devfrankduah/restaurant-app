import { afterEach, describe, expect, test } from 'vitest'
import { MockDb } from '../../_mocks_/db'
import { withSetup } from '../../_utils_/withSetup'
import { randSentence } from '@ngneat/falso'
import { createBaseDishObject } from '../../_mocks_/newDish'
import { useAddDish, useUpdateDish } from '../../../src/composables/query/addOrUpdateDish'

describe('Composables: addOrUpdateDish', () => {
  const db = new MockDb()
  const mockDish = { ...createBaseDishObject() }
  afterEach(() => {
    db.removeAll()
  })
  test('should create a new dish', async () => {
    const [result] = withSetup(useAddDish)
    expect(result).toBeTruthy()
    await result.mutateAsync(mockDish)
    expect(result.data.value).toEqual(mockDish)
  })
  test('should update an existing dish if an id is provided', async () => {
    db.add(mockDish)
    const newDescription = randSentence()
    const [result] = withSetup(() => useUpdateDish())
    await result.mutateAsync({
      id: mockDish.id,
      updates: { description: newDescription }
    })
    expect(result.variables.value.updates.description).toEqual(newDescription)
  })
})
