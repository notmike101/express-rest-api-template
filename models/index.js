const glob = require('glob')
const Sequelize = require('sequelize')
const config = require(`${process.env.APP_ROOT}/config`)

class ModelFactory {
  static async init() {
    this.models = {}
    this.sequelize = {}

    const modelFiles = await new Promise((resolve, reject) => {
      const ignoredFiles = [
        'index.js',
        'database.example/example_table.js'
      ]

      glob('**/*.js', { cwd: `${process.cwd()}/models` }, (err, files) => {
        if (err) reject(err)

        resolve(
          files
            .filter((file) => !ignoredFiles.includes(file))
            .filter(Boolean)
            .map((file) => ({
              folder: file.split('/')[0],
              name: file.split('/')[1].replace('.js', ''),
              dbName: file.split('/')[0],
              path: file
            }))
        )
      })
    })

    const sequelizeAuths = []
    const initializeTasks = modelFiles.map((model) => {
      return new Promise((resolve) => {
        this.sequelize[model.dbName] = new Sequelize(
          model.dbName,
          config.database.user,
          config.database.pass,
          config.database.config
        )

        sequelizeAuths.push(this.sequelize[model.dbName].authenticate())

        this.models[`${model.folder}_${model.name}`] = this.sequelize[
          model.dbName
        ].define(model.name, require(`./${model.path}`), {
          timestamps: false,
          paranoid: true,
          underscored: true,
          freezeTableName: true
        })

        resolve()
      })
    })

    await Promise.all(initializeTasks)
    await Promise.all(sequelizeAuths)
    this.setAssociations()
  }

  static getSequelizeInstances() {
    return this.sequelize
  }

  static getSequelizeInstance(db, model) {
    if (`${db}_${model}` in this.sequelize === false) {
      throw new Error(`Invalid model specified ${db}_${model}`)
    }

    return this.sequelize[`${db}_${model}`]
  }

  static getModels() {
    return this.models
  }

  static getModel(db, model) {
    if (`${db}_${model}` in this.models === false) {
      throw new Error(`Invalid model specified ${db}_${model}`)
    }

    return this.models[`${db}_${model}`]
  }

  static setAssociations() {
    const associations = config.sequelize_associations

    for (const schema in associations) {
      for (const association of associations[schema]) {
        this.getModel(schema, association.source).hasMany(
          this.getModel(schema, association.target),
          {
            sourceKey: association.sourceKey,
            foreignKey: association.foreignKey
          }
        )
      }
    }
  }
}

module.exports = ModelFactory
