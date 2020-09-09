/**
 * @swagger
 * path:
 *  /global/info:
 *    get:
 *      description: General information about the current API service
 *      tags:
 *        - Miscellaneous
 */

const express = require('express')
const router = express.Router()

const Enum = require(`${process.env.APP_ROOT}/config/enums`)
const config = require(`${process.env.APP_ROOT}/config`)

router.get('/', (req, res) => {
  return res.apiResolve(
    () => ({
      version: config.general.version,
      useragent: config.general.useragent,
      maintainers: config.general.maintainers,
      environment: process.env.NODE_ENV
    }),
    Enum.API.ERR_GENERAL
  )
})

module.exports = router
