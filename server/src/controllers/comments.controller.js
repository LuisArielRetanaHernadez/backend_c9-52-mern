// utils
const AppError = require('../utils/AppError');
const tryCatch = require('../utils/tryCatch');

// models
const Comment = require('../models/commentsModels')
const productsComments = require('../models/productsCommentsModels')
const User = require('../models/usersModels');
const { populate } = require('../models/commentsModels');

exports.createComment = tryCatch(async (req, res, next) => {

  const comment = {
    ...req.body,
    idUser: req.currentUser.id,
  }

  const commentNew = await Comment.create(comment);

  if (!commentNew) {
    return next(new AppError('Error al crear comentario', 400))
  }

  commentNew.save();

  const productComment = await productsComments.create({
    idComments: commentNew._id,
    idProducts: req.params.idProduct,
  })

  commentNew.save();
  
  productComment.save();

  return res.status(201).json({
    status: 'success',
    data: {
      comment: commentNew
    },
    message: 'Comentario creado correctamente'
  }).end();

})

exports.updateComment = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const { comment } = req.body;

  const commentFind = await Comment.findById(id);

  if (!commentFind) {
    return next(new AppError('Comentario no encontrado', 404))
  } 

  // update comment
  await commentFind.updateOne({
    ...req.body,
    coments: comment
  })

  commentFind.save();

  return res.status(200).json({
    status: 'success',
    data: {
      comment: commentFind,
      message: 'Comentario actualizado correctamente'
    }
  })

})

exports.allCommentsProduct = tryCatch(async (req, res, next) => {
  const id = req.params.id;

  const commentsFind = await productsComments.find({ idProducts: id })
  .populate({ 
    path: 'idComments',
    populate: { path: 'idUser' }
  });

  return res.status(200).json({
    status: 'success',
    data: {
      comments: commentsFind
    }
  }).end();

});  

exports.deleteComment = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  console.log('currentUser -> ', req.currentUser)
  const comment = await Comment.updateOne({ _id: id, status: 'active' }, { status: 'deleted' });

  if (!comment) {
    return next(new AppError('Comentario no encontrado', 404))
  }


  return res.status(200).json({
    status: 'success',
    message: 'Comentario eliminado correctamente'
  })
})