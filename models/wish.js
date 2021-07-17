
//数据库映射文件
const Sequelize=require('sequelize')//引入sequelize模块
const db=require('../db')//引入数据库实例
//定义model
const Wish=db.define('Wish',{
        //主键
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        //许愿姓名
        name:{
            type:Sequelize.STRING(20),
            allowNull: false
        },
//  许愿内容
        content:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },
    {
        underscored:true,//是否支持驼峰
        tableName:'wish',//Mysql数据库表名
    }
)
module.exports=Wish
