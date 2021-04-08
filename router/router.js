const express = require('express');
const router = express.Router();
const userController = require('../controller/controller')
const {requireAuth,checkUser} = require('../authMiddleware/authMiddleware')


router.get('*',checkUser)
router.get('/text',userController.text)
router.get('/',userController.homepage)
router.get('/login',userController.login_get)
router.get('/signup',userController.signup_get)
router.get('/smoothies',requireAuth,userController.smoothies)
router.get('/logout',userController.log_out)
router.post('/signup',userController.signup_post)
router.post('/login',userController.login_post)







module.exports=router;