const pjson = require(`${process.env.APP_ROOT}/package.json`)

module.exports = {
  spec: {
    openapi: '3.0.3',
    info: {
      title: 'Express Web API',
      version: '3.0.0',
      description: 'Documentation for Express Web API.<br>CORS limitations only affect production environments.<br>Development environments does not have any CORS rules in place.<br><br><a href="http://localhost:5000/docs/spec.json" target="_BLANK">View Spec JSON</a>',
    },
    servers: [
      {
        url: 'http://localhost:5000/',
        description: 'Where local API server is running for development'
      }
    ]
  }
}
