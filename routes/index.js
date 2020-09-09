const glob = require('glob')

module.exports = new Promise((resolve, reject) => {
  glob('**/*.js', { cwd: `${process.cwd()}/routes` }, (err, files) => {
    if (err) reject(err)

    const routes = files
      .map((file) => ({
        path: `./routes/${file}`,
        prefix: `/${file.substring(0, file.length - 3)}`,
        routeName: file.substring(0, file.length - 3)
      }))
      .filter((file) => file.path !== './routes/index.js')

    resolve(routes)
  })
})
