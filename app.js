const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const ModelFactory = require('./models')
const headers = require('./middleware/headers')
const response = require('./middleware/response')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(headers)
app.use(response)

// Only use morgan to log output in development environments
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'))
}

routes.then((routes) => {
  const disabledRoutes = []

  routes.forEach((route) => {
    const name = route.routeName.split('/')[0]
    if (!disabledRoutes.includes(name)) {
      try {
        app.use(route.prefix, require(route.path))
      } catch (err) {
        console.error(
          `Failed to use route ${route.path}.  Error: ${err.message}`
        )
      }
    }
  })
})

app.prepare = async () => {
  await ModelFactory.init()
}

app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  res.sendStatus(200)
})

module.exports = app
