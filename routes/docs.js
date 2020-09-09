/**
 * @swagger
 * path:
 *  /docs:
 *    get:
 *      description: Documentation
 *      tags:
 *        - Miscellaneous
 *    servers:
 *      - url: 'http://localhost:5000'
 */

const express = require('express')
const path = require('path')
const glob = require('glob')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const config = require(`${process.env.APP_ROOT}/config`)

const router = express.Router()

const skipFiles = [
  path.join(process.env.APP_ROOT, 'routes', 'index.js')
]

const files = glob
  .sync('**/*.js', { cwd: path.join(process.env.APP_ROOT, 'routes') })
  .map((file) => path.join(process.env.APP_ROOT, 'routes', file))
  .filter((file) => !skipFiles.includes(file))

const swaggerSpec = swaggerJsDoc({
  swaggerDefinition: config.swagger.spec,
  apis: files
})

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec))
router.get('/spec.json', (req, res) => {
  res.send(swaggerSpec)
  res.end()
})

module.exports = router
