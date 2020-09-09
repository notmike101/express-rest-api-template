/**
 * @swagger
 * path:
 *  /public:
 *    get:
 *      description: Allows for exploration of the /private directory in the API instance
 *      tags:
 *        - Miscellaneous
 */

 const express = require('express')
const path = require('path')
const serveIndex = require('serve-index')

const router = express.Router()

const publicDir = path.join(process.env.APP_ROOT, 'public')

router.use('/', express.static(publicDir, serveIndex(publicDir)))

module.exports = router
