const obj={
    //默认请求成功
    DEFAULT_SUCCESS:{
        code:10000,
        msg:''
    },
    //默认请求失败
    DEFAULT_ERROR:{
        code:188,
        msg:'出现错误'
    },
    //定义错误返回-缺少必要的参数
    LACK:{
        code:199,
        msg:'缺少必要的参数'
    },
//    定义错误返回-定义token验证错误
    TOKEN_ERROR:{
        code:401,
        msg:'Token验证失败'
    },
    //定义错误返回-用户名和密码错误
    LOGIN_ERROR:{
        code:101,
        msg:'用户名和密码错误'
    },
//    定义错误返回-管理员信息不存在
    ADMIN_NOT_EXSIT:{
        code:102,
        msg:'管理员信息不存在'
    },
    //    定义错误返回-许愿信息不存在
    WISH_NOT_EXSIT:{
        code:102,
        msg:'许愿信息不存在'
    },
}
module.exports=obj
