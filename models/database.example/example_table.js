const Sequelize = require('sequelize')

module.exports = {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    uniqueKey: true,
    primaryKey: true,
    autoIncrement: true
  },
  databaseColumn: {
    type: Sequelize.String
  }
}
