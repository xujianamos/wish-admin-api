//token验证的中间件
//引入token处理的controller
const Token=require('../../controllers/token');
//引入常量
const Constant=require('../../constant/constant')
const exportObj={
    verifyToken
}
module.exports=exportObj
function verifyToken(req,res,next) {
    //如果请求路径是login，则跳过，继续下一步
    if(req.path==='/login') return next()
    //获取请求头中的token
    let token=req.headers.token;
    //调用TokenController中的token解密方法，对参数token进行解密
    let tokenVerifyObj=Token.decrypt(token);
    if(tokenVerifyObj.token){
        //如果token验证通过，则继续下一步操作
        next()
    }else {
        //如果token验证不通过，则返回错误json
        res.json(Constant.TOKEN_ERROR)
    }


}