module.exports = {
  user: 'dbUsername',
  pass: 'dbPassword',
  config: {
    dialect: 'mysql',
    host: 'host',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  }
}