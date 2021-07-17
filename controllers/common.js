//公共方法模块

//引入async模块
const async=require('async')
//引入常量模块
const constant=require('../constant/constant')

//定义一个导出对象
const exportObj={
    clone,
    checkParams,
    autoFn
}
module.exports=exportObj
//克隆方法
/**
 * 克隆一个对象
 *
 *
 * **/
function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}
//校验参数全局方法
/**
 * params 请求的参数集
 * checkArr 需要验证的参数
 * cb 回调
 * */
function checkParams(params,checkArr,cb) {
    let flag=true
    checkArr.forEach(v=>{
        if(!params[v]){
            flag=false
        }
    })
    if(flag){
        cb(null)
    }else {
        cb(constant.LACK)
    }
}
//返回统一方法,返回json格式数据
/**
 * tasks 当前controller执行tasks
 * res 当前controller responese
 * resObj 当前controller返回json对象
 * */
function autoFn(tasks,res,resObj) {
    async.auto(tasks,function (err){
        if(!!err){
            console.log(JSON.stringify(err))
            res.json({
                code:err.code||constant.DEFAULT_ERROR.code,
                msg:err.msg||JSON.stringify(err)
            })
        }else {
            res.json(resObj)
        }
    })
}