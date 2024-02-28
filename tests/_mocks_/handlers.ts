import { http, HttpResponse } from 'msw'
import { MockDb } from './db'
import { Dish } from '../../src/types'

const db = new MockDb()
const VITE_BASE_API = 'http://localhost:3001'
export const handlers = [
  http.get(`${VITE_BASE_API}/dishes`, ({ params }) => {
    const { __limit = 10, __page = 1 } = params
    const limit = Number(__limit) || 10
    const offset = (Number(__page) || 1) * limit - limit
    return HttpResponse.json(db.getAll(limit, offset))
  }),
  http.delete(`${VITE_BASE_API}/dishes/:id`, ({ params }) => {
    const { id } = params
    if (!id || typeof id !== 'string') {
      return HttpResponse.error()
    }
    return HttpResponse.json(db.remove(id))
  }),
  http.put<Record<string, string>, Dish>(
    `${VITE_BASE_API}/dishes/:id`,
    async ({ params, request }) => {
      const { id } = params
      if (!id || typeof id !== 'string') {
        return HttpResponse.error()
      }
      const newDish = await request.json()
      if (!newDish || typeof newDish !== 'object') {
        return HttpResponse.error()
      }
      return HttpResponse.json(db.update(newDish))
    }
  ),
  http.get(`${VITE_BASE_API}/dishes/:id`, ({ params }) => {
    const { id } = params
    if (!id || typeof id !== 'string') {
      return HttpResponse.error()
    }
    return HttpResponse.json(db.get(id))
  }),
  http.post<Record<string, string>, Dish>(`${VITE_BASE_API}/dishes`, async ({ request }) => {
    const newDish = await request.json()
    if (!newDish || typeof newDish !== 'object') {
      return HttpResponse.error()
    }
    return HttpResponse.json(db.add(newDish))
  })
]
