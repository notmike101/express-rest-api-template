const express = require('express')
const router = express.Router()

const ModelFactory = require(`${process.env.APP_ROOT}/models`)
const Enum = require(`${process.env.APP_ROOT}/config/enums`)

router.get('/', (req, res) => {
  return res.apiResolve(async () => {
    const config = await ModelFactory.getModel('database', 'table').findAll()

    return {
      config
    }
  }, Enum.API.ERR_GENERAL)
})

module.exports = router
