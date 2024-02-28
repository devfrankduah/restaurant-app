import { beforeAll, afterEach, afterAll } from "vitest"
import { server } from "../_mocks_/node"
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())