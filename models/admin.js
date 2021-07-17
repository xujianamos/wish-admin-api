//数据库映射文件
const Sequelize=require('sequelize')//引入sequelize模块
const db=require('../db')//引入数据库实例
//定义model
const Admin=db.define('Admin',{
        //主键
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        //用户名
        username:{
            type:Sequelize.STRING(20),
            allowNull: false
        },
        //密码
        password:{
            type:Sequelize.STRING(36),
            allowNull:false
        },
    //姓名
    name:{
            type:Sequelize.INTEGER,
        allowNull:false
    },
    //角色
    role:{
            type:Sequelize.STRING(20),
        allowNull:false
    },
    //上次登录时间
    lastLoginAt:{
            type:Sequelize.DATE
    }
    },
    {
        underscored:true,//是否支持驼峰
        tableName:'admin',//Mysql数据库表名
    }
)
module.exports=Admin
