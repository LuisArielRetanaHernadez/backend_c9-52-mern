const cartRouter = require('express').Router()

const {
  checkAuth,
  proctectUser
} = require('../middlewares/auth')

const {
  checkAddress
} = require('../middlewares/address.middlewares')

const {
  addProductsCart,
  buyProductsCars,
  allProductsCar
} = require('../controllers/cart.controller')

// cartRouter.use(checkAuth, proctectUser)

cartRouter.get('/', checkAuth, allProductsCar)
cartRouter.post('/add', checkAuth, addProductsCart)
cartRouter.post('/buy', checkAuth, checkAddress, buyProductsCars)

module.exports = { cartRouter }