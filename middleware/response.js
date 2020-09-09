// Custom responses to follow the same err/result model as a promise
// In a production application, this would be a lot more in depth

const Enum = require('../config/enums')

module.exports = (req, res, next) => {
  const unpackError = (err) => {
    if (!err) {
      return null
    }

    if (typeof err === 'string') {
      return err
    }

    if (err instanceof Error) {
      if ('name' in err && err.name === 'SequelizeValidationError') {
        return err.errors.map((e) => ({
          msg: e.message,
          field: e.path
        }))
      }
    }

    return err.toString()
  }

  const apiResponse = async (
    err,
    result,
    enumCode = Enum.API.SUCCESS,
    responseCode = 200
  ) => {
    const ret = {
      success: enumCode === Enum.API.SUCCESS ? 1 : 0,
      code: enumCode,
      error: unpackError(err),
      data: result
    }

    /*  Enable this if you're trying to track down a suppressed error message
    
    if (process.env.NODE_ENV !== 'production' && err) {
      // Include stack traces on dev
      ret.stack = (err instanceof Error) ? err.stack : null
    }
    */

    res.status(responseCode)

    return res.send(ret)
  }

  res.apiResolve = async (
    promise,
    enumCodeOnFailure = Enum.API.ERR_GENERAL,
    responseCodeOnFailure = 200
  ) => {
    try {
      return apiResponse(null, await promise())
    } catch (e) {
      return apiResponse(e, null, enumCodeOnFailure, responseCodeOnFailure)
    }
  }

  res.apiResponse = apiResponse

  return next()
}
