const {verifyToken} = require ('../utils/generateToken')
const AppError = require('../utils/AppError')
const tryCatch = require('../utils/tryCatch')

// models
const User = require('../models/usersModels')

exports.checkAuth = async(req,res,next) => {
  try {
    //const token = req.headers.authorization.split(' ').pop()
    let token = null
    if (
        req.headers.authorization 
        && req.headers.authorization.startsWith('Bearer')
      ) { 
      token = req.headers.authorization.split(' ')[1]
    } else {
      return next(new AppError('No autorizado', 401))
    }

    const tokenData = await verifyToken(token)

    if (!tokenData) {
      return next(new AppError('No autorizado', 401))
    }
    req.currentUser = tokenData
    next()
    
  } catch (error) {

    console.log(error)
    return next(new AppError('No autorizado', 401))
  }
}

exports.checkSeller = tryCatch(async (req, res, next) => {
  if (req.currentUser.role !== 'seller') {
    return next(new AppError('No autorizado', 401))
  }
  return next()
})

exports.proctectUser = tryCatch(async (req, res, next) => {
  if (req.currentUser.id !== req.params.id) {
    return next(new AppError('No autorizado', 401))
  }
  
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new AppError('No encontrado', 401))
  }
  req.currentUser = {
    ...req.currentUser,
    user
  }
  return next()
})