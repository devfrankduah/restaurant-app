import { Dish } from '../../src/types'
export class MockDb {
  static instance: MockDb
  constructor() {
    console.info(`--------------------------\n💫 MockDb initialized\n--------------------------
    `)
    if (MockDb.instance) {
      return MockDb.instance
    } else {
      MockDb.instance = this
      return MockDb.instance
    }
  }
  dishes: Dish[] = []
  add(dish: Dish) {
    this.dishes.push(dish)
    return dish
  }
  remove(id: string) {
    this.dishes = this.dishes.filter((dish) => dish.id !== id)
    return id
  }
  update(dish: Dish) {
    for (let i = 0; i < this.dishes.length; i++) {
      if (this.dishes[i].id === dish.id) {
        this.dishes[i] = dish
        return dish
      }
    }
  }
  get(id: string) {
    return this.dishes.find((dish) => dish.id === id)
  }
  getAll(_limit?: number, _offset?: number) {
    const limit = _limit || 10
    const offset = _offset || 0
    return this.dishes.slice(offset, offset + limit)
  }
  removeAll() {
    this.dishes = []
    return
  }
}