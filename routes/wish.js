//许愿管理路由
const express=require('express')
const router=express.Router()
//引入自定义的controller
const WishController=require('../controllers/wish')
//许愿列表路由
router.get('/',WishController.list);
//查询单条许愿详情路由
router.get('/:id',WishController.info);
//添加许愿路由
router.post('/',WishController.add);
//修改许愿路由
router.put('/',WishController.update)
//删除许愿路由
router.delete('/',WishController.remove)
module.exports=router