//登录模块路由
const express = require('express');
const router = express.Router();

//引入自定义的controller
const IndexController=require('../controllers/index')
//定义登录路由，post请求
router.post('/login',IndexController.login)

module.exports = router;
