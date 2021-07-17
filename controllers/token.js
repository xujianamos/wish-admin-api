//引入jsonwebtoken包
const jwt=require('jsonwebtoken')
//设定一个密钥，用来加密和解密token
const tokenKey='XfZEpWEn?ARD7rHBN'
const Token={
    encrypt,
    decrypt
}
module.exports=Token

//加密token
/**
 * data 需要加密在token中的数据
 * time Token的过期时间，单位为s
 * return 返回一个token
 * */
function encrypt(data,time) {
    return jwt.sign(data,tokenKey,{expiresIn: time})
}

//解密token
/**
 * token 加密之后的token
 * return 返回对象
 * {{token:boolean(true表示token合法，false则表示不合法),
 * data：*(解密出来的数据或错误信息)}}
 * **/
function decrypt(token) {
    try {
        let data=jwt.verify(token,tokenKey);
        return {
            token:true,
            data:data
        }
    }catch (e) {
        return {
            token: false,
            data: e
        }
    }
}