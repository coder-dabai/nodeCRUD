/* 此文件是针对数据操作的封装   不关心业务 */
/* 将数据库的操作改为文件操作，深入理解方法封装，回调函数 */
const { json } = require('body-parser')
var fs = require('fs')

//数据路径
var dbpath = './db.json'
/* 获取所有的学生列表 */
exports.find = function(callback){    //采用回调函数来返回学生对象  因为读取文件是一个异步操作
  fs.readFile(dbpath,function(err,data){
      if(err){
          return callback(err)
      }
      callback(null,JSON.parse(data).students)
  })
}
/* 根据id找出学生信息 */
exports.findById = function(id,callback){
  fs.readFile(dbpath,function(err,data){
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data).students
    //es6的数组find方法，返回符合回调函数的数据
    var ret = students.find(function(item){
      return item.id === parseInt(id)
    })
    callback(null,ret)
  })
}
/* 根据id更新学生数据 */
exports.updateById = function(student,callback){
  fs.readFile(dbpath,function(err,data){
    if(err){
      return callback(err)
    }
    //读取出学生数据
    var students = JSON.parse(data).students
    student.id = parseInt(student.id)

    var stu = students.find(function(item){
      return item.id === student.id
    })

    for(var key in student){
      stu[key] = student[key]
    }
    var fileData = JSON.stringify({
      students : students
    })
    fs.writeFile(dbpath,fileData,function(err){
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}
/* 添加保存学生 */
exports.save = function(student,callback){
  fs.readFile(dbpath,function(err,data){
    if(err){
      return callback(err)
    }
    //读取出学生数据
    var students = JSON.parse(data).students
    //设置新增数据的id

    student.id = students[students.length - 1].id + 1 
    
    //添加一条数据
    students.push(student) 
    //将添加后的数组再次转化为字符串形式写入文件中
    var fileData = JSON.stringify({
      students : students
    })
    fs.writeFile(dbpath,fileData,function(err){
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}
/* 更新学生 */
exports.update = function(){

}
/* 删除学生 */
exports.deleteById = function(id,callback){
  fs.readFile(dbpath,function(err,data){
    if(err){
      return callback(err)
    }

    var students = JSON.parse(data).students
    
    var index = students.findIndex(function(item){
      return item.id === parseInt(id)
    })

    students.splice(index,1)
    
    var fileData = JSON.stringify({
      students : students
    })
    fs.writeFile(dbpath,fileData,function(err){
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}