const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.tokenSign=async(user)=>{
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:process.env.JWT_EXPIRE_IN
    }
  )
}

exports.verifyToken=async(token)=>{
  try {
    return jwt.verify(token,process.env.JWT_SECRET)
  } catch (error) {
    return null    
  }
}