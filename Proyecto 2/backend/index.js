require('dotenv').config()
const app = require('./app') // la aplicación Express real
const http = require('http')

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})