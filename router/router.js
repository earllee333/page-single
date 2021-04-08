const express = require('express');
const router = express.Router();
const userController = require('../controller/controller')

router.get('/',userController.homepage)
router.get('/login',userController.log_in)
router.get('/signup',userController.sign_up)
router.get('/logout',userController.log_out)
router.post('/signup',userController.sign_post)
router.post('/login',userController.log_post)







module.exports=router;