
const AppError = require('../utils/AppError')
const tryCatch = require('../utils/tryCatch')

const modelAddres = require('../models/addressModels')

exports.addAdrres = tryCatch( async(req, res, next) => {
  
  const idUser = req.currentUser.id

  const newAddress = new modelAddres({
    ...req.body,
    idUser
  })

  newAddress.save()

  return res.status(202).json({
    status: 'success',
    data: {
      user: req.User,
      address: newAddress,
    },
    message: 'usuario creado exitosamente '
  })

})