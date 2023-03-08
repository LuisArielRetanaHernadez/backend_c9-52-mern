const AppError = require('../utils/AppError')
const tryCatch = require('../utils/tryCatch')

// models
const modelAddress = require('../models/addressModels')

exports.checkAddress = tryCatch( async(req, res, next) => {
  const { title } = req.body
  const idUser = req.currentUser

  const existAddressTitle = await modelAddress.findOne(idUser, title)

  if (existAddressTitle !== null) {
    return next( new AppError('Ya tiene una direccion con ese titulo'))
  }

  return next()

})