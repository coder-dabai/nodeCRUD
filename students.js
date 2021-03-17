/* 此文件是基于mongose的数据库操作 */
var mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/itcast')  //itcast为数据库，没有会自动创建

var Schema = mongoose.Schema

var studentSchema = new Schema({
  name : {
      type : String,
      required : true
  },
  gender : {
      type : Number,
      enum : [0,1],
      default : 0
  },
  age : {
      type : Number,
  },
  hobbies : {
      type : String
  }
})

/* 将Schema转换为一个Model，直接导出模型构造函数 */
module.exports = mongoose.model('Student',studentSchema)