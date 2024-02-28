import { v4 as uuidv4 } from 'uuid'
import { Dish } from "../../src/types"
import { randSentence } from '@ngneat/falso'

export const createBaseDishObject = (): Dish => ({
    id: uuidv4(),
    name: "Rice",
    status: 'Want to Try',
    diet: '',
    description: randSentence({ length: 5 }).toString(),
})
