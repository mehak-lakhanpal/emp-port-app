const { compareSync } = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const userController = require('../controllers/user');
const multer = require('multer');
const fileUpload = require('../middlewares/file-upload')
const upload = fileUpload.upload('photo');

/* Register new user */
router.post('/register',  userController.validate('createUser'),function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.status(400).json({error:true,message:err.message});
      return;
    }
    userController.createUser(req,res,next);
  })
});

router.post('/logout', userController.logoutUser);

/* Login user */
router.post('/login',
userController.validate('loginUser'),
userController.loginUser,
  );


  router.get('/register',function (req, res, next) {
    res.render('./../views/user/register', {
        user: {}
    })
  });

    router.get('/login', function (req, res, next) {
      res.render('./../views/user/login', {
        user: {},
    });

});

module.exports = router;
