const { validationResult } = require('express-validator')
const { unlink } = require('fs').promises
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    // console.log(errors.array())
    //transform error message to key:message format
    const formatted = {}
    for await (let error of errors.array()) {
      formatted[error.param] = error.msg
    }

    try {
      //delete file if validation error occure
      await unlink(req.file.path)
    } catch (error) {
      //fail silenty
    }

    return res.status(422).json({
      message: 'Periksa kembali data yang anda masukkan',
      errors: formatted,
    })
  }
}

module.exports = validate
