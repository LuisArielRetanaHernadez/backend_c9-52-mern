// mongoose
const { Schema, default: mongoose } = require('mongoose')

const codefirmRegisterUser = new Schema({
  code: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0
  },
  token: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending'
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nameUser: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'customer'
  },
})

const CodeConfrimRegisterUser = mongoose.model('CodeConfirmRegisterUser', codefirmRegisterUser)

module.exports = CodeConfrimRegisterUser
