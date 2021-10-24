const { Permission } = require('../models')

exports.list = async (req, res, next) => {
  try {
    return res.send({
      data: await Permission.findAll(),
    })
  } catch (error) {
    next(error)
  }
}
