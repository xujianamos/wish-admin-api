const express=require('express')
const router=express.Router()
//引入自定义的controller
const AdminController=require('../controllers/admin')
//管理员列表
// router.get('/list',AdminController.list)
//查询管理员详情
// router.get('/:id',AdminController.info)
//新增管理员
// router.post('/add',AdminController.add)
//修改管理员
// router.put('/edit',AdminController.update)
//删除管理员
// router.delete('/delete',AdminController.remove)
module.exports=router