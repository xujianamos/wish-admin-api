//默认dev配置
const config={
    DEBUG:true,//是否调试模式
    //MYSQL数据库连接配置
    MYSQL:{
        host:'localhost',//MYSQL的主机地址
        database:'wish',//MYSQL的数据库名
        username:'test',//MYSQL的用户名
        password:'123456'//MYSQL的密码
    }
};
if(process.env.NODE_ENV==='production'){
//  生产环境MYSQL数据库连接配置
    config.MYSQL={
        host:'localhost',//MYSQL的主机地址
        database:'wish',//MYSQL的数据库名
        username:'test',//MYSQL的用户名
        password:'123456'//MYSQL的密码
    }
}
module.exports=config
