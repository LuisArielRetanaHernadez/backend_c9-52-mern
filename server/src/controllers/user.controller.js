const AppError = require('../utils/appError');
const tryCatch = require('../utils/tryCatch');

const bcrypt = require('bcrypt');

const User = require('../models/usersModels');

exports.loginUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const userFind = await User.findOne({ email });


  if (!userFind) {
    return next(new AppError('User not found', 404));
  }

  return res.status(200).json({
    code: 200,
    status: 'success',
    data: {
      user: userFind,
    }
  }).send();

}); 

exports.registerUser = tryCatch(async (req, res, next) => { 
  const {
    name, 
    lastName,
    password,
    nameUser,
    photo,
    email,
    status
  } = req.body;  

  // encontrar en la base de datos si existe el email
  const userFind = await User.findOne({ email });

  if (userFind) {
    return next(new AppError('este usuario ya esta registrado', 404));
  }

  // encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const userNew = {
    name,
    lastName,
    nameUser,
    email,
    password: passwordHash,
    photo
  }

  // resgistrando el usuario en el modelo User
  const user = await User.create(userNew);

  if(!user) {
    return next(new AppError('Error al crear el usuario', 404));
  }

  user.save()

  user.password = undefined;

  return res.status(200).json({
    code: 200,
    status: 'success',
    data: {
      user,
    }
  });

});


