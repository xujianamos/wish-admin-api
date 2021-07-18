//引入公共方法
const Common=require('./common')
//引入wish表的model
const AdminModel=require('../models/admin')
//引入常量
const Constant=require('../constant/constant')
//引入时间处理包
const dateFormat=require('dateformat')
let exportObj={
    list,
    info,
    add,
    update,
    remove
}
module.exports=exportObj
//获取管理员列表
function list(req,res) {
    const {rows,page,username}=req.query
    //定义一个返回对象
    const resObj=Common.clone(Constant.DEFAULT_SUCCESS)
    //定义一个async任务
    let tasks={
        //校验参数方法
        checkParams:cb=>{
            //调用公共方法校验参数，如果成功，则继续后续操作
            //如果失败，则传递错误信息到async的最终方法
            Common.checkParams(req.query,['page','rows'],cb)
        },
        //查询方法，依赖校验参数方法
        query:['checkParams',(results,cb)=>{
            //根据前端传递的参数计算sql语句中需要的offset，即从多少条开始查询
            let offset=rows*(page-1)||0
            //根据前端提交的参数计算sql语句中需要的limit，即查询多少条
            let limit=parseInt(rows)||20
            //设定一个查询对象
            let whereCondition={}
            //如果查询姓名存在，则查询对象增加姓名
            if(username){
                whereCondition.username=username
            }
            //通过offset和limit使用wish的model去数据库中查询，并按照创建时间排序
            AdminModel.findAndCountAll({
                where:whereCondition,
                offset:offset,
                limit:limit,
                order:[['created_at','DESC']]
            }).then(function (result){
                //查询结果处理
                //定义一个空数组list，用来存放查询结果
                let list=[]
                //遍历sql查询出来的结果，处理后装入list
                result.rows.forEach((v,i)=>{
                    let obj={
                        id:v.id,
                        username:v.username,
                        role:v.role,
                        lastLoginAt: dateFormat(v.lastLoginAt,'yyyy-mm-dd HH:MM:ss'),
                        createAt: dateFormat(v.createAt,'yyyy-mm-dd HH:MM:ss')
                    }
                    list.push(obj)
                });
                //给返回结果赋值，包括列表和总条数
                resObj.data={
                    list,
                    count:result.count
                };
                //继续后续操作
                cb(null)

            }).catch(err=>{
                //错误处理
                //打印错误日志
                console.log(err)
                //传递错误信息到async的最终方法中
                cb(Constant.DEFAULT_ERROR)
            })
        }]
    };
    //执行公共方法中的autoFn方法返回数据
    Common.autoFn(tasks,res,resObj)
}
//获取管理员详情
function info(req,res) {
    const {id}=req.params
    //定义一个返回对象
    const resObj=Common.clone(Constant.DEFAULT_SUCCESS)
    //定义一个async任务
    let tasks={
        //校验参数方法
        checkParams:cb=>{
            //调用公共方法校验参数，如果成功，则继续后续操作
            //如果失败，则传递错误信息到async的最终方法
            Common.checkParams(req.params,['id'],cb)
        },
        //查询方法，依赖校验参数方法
        query:['checkParams',(results,cb)=>{
            //使用wish的model去数据库中查询，并按照创建时间排序
            AdminModel.findByPk(id).then(function (result){
                //查询结果处理
                if(result){
                    //将查询到的结果给返回对象赋值
                    resObj.data={
                        id:result.id,
                        username:result.username,
                        role:result.role,
                        lastLoginAt: dateFormat(result.lastLoginAt,'yyyy-mm-dd HH:MM:ss'),
                        createAt: dateFormat(result.createAt,'yyyy-mm-dd HH:MM:ss')
                    };
                    //继续后续操作
                    cb(null)
                }else {
                    //查询失败，传递错误信息到async的最终方法
                    cb(Constant.ADMIN_NOT_EXSIT)
                }
            }).catch(err=>{
                //错误处理
                //打印错误日志
                console.log(err)
                //传递错误信息到async的最终方法中
                cb(Constant.DEFAULT_ERROR)
            })
        }]
    };
    //执行公共方法中的autoFn方法返回数据
    Common.autoFn(tasks,res,resObj)
}
//新增管理员
function add(req,res) {
    const {password,username,name,role}=req.body
    //定义一个返回对象
    const resObj=Common.clone(Constant.DEFAULT_SUCCESS)
    //定义一个async任务
    let tasks={
        //校验参数方法
        checkParams:cb=>{
            //调用公共方法校验参数，如果成功，则继续后续操作
            //如果失败，则传递错误信息到async的最终方法
            Common.checkParams(req.body,['username','password','name','role'],cb)
        },
        //查询方法，依赖校验参数方法
        add:['checkParams',(results,cb)=>{
            //使用admin的model中的方法插入数据库
            AdminModel.create({
                username:username,
                password:password,
                name:name,
                role:role
            }).then(function (result){
                // 插入结果处理
                // 继续后续操作
                cb(null)
            }).catch(err=>{
                //错误处理
                //打印错误日志
                console.log(err)
                //传递错误信息到async的最终方法中
                cb(Constant.DEFAULT_ERROR)
            })
        }]
    };
    //执行公共方法中的autoFn方法返回数据
    Common.autoFn(tasks,res,resObj)

}
//修改管理员信息
function update(req,res) {
    const {password,username,name,role,id}=req.body
    //定义一个返回对象
    const resObj=Common.clone(Constant.DEFAULT_SUCCESS)
    //定义一个async任务
    let tasks={
        //校验参数方法
        checkParams:cb=>{
            //调用公共方法校验参数，如果成功，则继续后续操作
            //如果失败，则传递错误信息到async的最终方法
            Common.checkParams(req.body,['username','password','name','role'],cb)
        },
        //查询方法，依赖校验参数方法
        update:['checkParams',(results,cb)=>{
            //使用wish的model中的方法更新
            AdminModel.update({
                username:username,
                password:password,
                name:name,
                role:role
            },{
                where:{
                    id:id
                }
            }).then(function (result){
                // 更新结果处理
                if(result[0]){
                    //更新成功
                    cb(null)

                }else {
                    // 如果更新失败，传递错误信息到async的最终方法中
                    cb(Constant.ADMIN_NOT_EXSIT)
                }
                // 继续后续操作
            }).catch(err=>{
                //错误处理
                //打印错误日志
                console.log(err)
                //传递错误信息到async的最终方法中
                cb(Constant.DEFAULT_ERROR)
            })
        }]
    };
    //执行公共方法中的autoFn方法返回数据
    Common.autoFn(tasks,res,resObj)
}
//删除管理员
function remove(req,res) {
    const {id}=req.body
    //定义一个返回对象
    const resObj=Common.clone(Constant.DEFAULT_SUCCESS)
    //定义一个async任务
    let tasks={
        //校验参数方法
        checkParams:cb=>{
            //调用公共方法校验参数，如果成功，则继续后续操作
            //如果失败，则传递错误信息到async的最终方法
            Common.checkParams(req.body,['id'],cb)
        },
        //删除方法，依赖校验参数方法
        update:['checkParams',(results,cb)=>{
            //使用wish的model中的方法更新
            AdminModel.destroy({
                where:{
                    id:id
                }
            }).then(function (result){
                // 删除结果处理
                if(result){
                    //删除成功
                    cb(null)

                }else {
                    // 如果删除失败，传递错误信息到async的最终方法中
                    cb(Constant.ADMIN_NOT_EXSIT)
                }
                // 继续后续操作
            }).catch(err=>{
                //错误处理
                //打印错误日志
                console.log(err)
                //传递错误信息到async的最终方法中
                cb(Constant.DEFAULT_ERROR)
            })
        }]
    };
    //执行公共方法中的autoFn方法返回数据
    Common.autoFn(tasks,res,resObj)

}