import jsonServer from 'json-server'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use((req, res, next) => {
  setTimeout(next, 500)
})

server.use(middlewares)
server.use(router)

const port = 3001

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
