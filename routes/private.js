/**
 * @swagger
 * path:
 *  /private:
 *    get:
 *      description: Allows for exploration of the /private directory in the API instance
 *      tags:
 *        - Miscellaneous
 *    servers:
 *      - url: 'http://localhost:5000'
 */

const express = require('express')
const path = require('path')
const serveIndex = require('serve-index')

const router = express.Router()

if (process.env.NODE_ENV === 'development') {
  const privateDir = path.join(process.env.APP_ROOT, 'private')

  router.use('/', express.static(privateDir, serveIndex(privateDir)))
}

module.exports = router
