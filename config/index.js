const fs = require('fs')
const path = require('path')

const config = {}

fs.readdirSync(path.join(__dirname, "modules")).forEach((file) => {
  const configModuleName = file.split('.')[0]
  const configModule = require(path.join(__dirname, 'modules', file))
  config[configModuleName] = configModule
})

config.sequelize_associations = require('./sequelize_associations')

module.exports = config
