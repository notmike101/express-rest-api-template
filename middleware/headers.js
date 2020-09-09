module.exports = (req, res, next) => {
  const origin = req.get('origin')
  console.log(req.path)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }

  if (
    !req.path.startsWith('/docs') &&
    !req.path.startsWith('/public') &&
    !req.path.startsWith('/private')
  ) {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
  }

  const authorizedOrigins = [
    'http://localhost:5000',
    'http://localhost'
  ]

  if (process.env.NODE_ENV !== 'development') {
    if (authorizedOrigins.includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin
    } else {
      headers['Access-Control-Allow-Origin'] = authorizedOrigins[0]
    }
  }

  Object.entries(headers).forEach(([key, value]) => {
    res.header(key, value)
  })

  next()
}
