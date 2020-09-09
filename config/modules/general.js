const pjson = require(`${process.env.APP_ROOT}/package.json`)

module.exports = {
  version: process.env.npm_package_version || pjson.version,
  useragent: `Express REST API v${process.env.npm_package_version || pjson.version}`,
  maintainers: ['You!']
}
