//利用express提供的路由方式来分离业务，让文件更纯粹，而不是所有的get都放在app.js中
var fs = require('fs')

var express = require('express')
// var app = express()

var Students = require('./students')   //引入封装的students操作方法

//var bodyParser = require('body-parser')


//1.创建一个路由容器
var router = express.Router()

//2.把路由都放到router容器中
router.get('/students',function(req,res){
    //utf-8将字符编码转为认识的汉字
    //老方法  未封装students操作方法之前用这个
    /* fs.readFile('./db.json','utf-8',function(err,data){
      if(err){
          return res.status(500).send('Server error!')
      }
      res.render('index.html',{
        students : JSON.parse(data).students   //将字符串改为对象再获取其中的students对象
    })
  })
     */
    Students.find(function(err,students){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.render('index.html',{
            students: students
        })
    })
})

router.get('/students/new',function(req,res){
    //utf-8将字符编码转为认识的汉字
    fs.readFile('./db.json','utf-8',function(err,data){
      if(err){
          return res.status(500).send('Server error!')
      }
      res.render('new.html')
  })
    
})

router.post('/students/new',function(req,res){
  new Students(req.body).save(function(err){
    if(err){
      return res.status(500).send('server err!')
    }
    //重定向到学生列表页
    res.redirect('/students')
  })
    
})

router.get('/students/edit',function(req,res){
  Students.findById(req.query.id.replace(/"/g,''),function(err,student){
    if(err){
      return res.status(500).send('Server err!')
    }
    res.render('edit.html',{
      student : student
    })
  }) 
})

router.post('/students/edit',function(req,res){
  var id = req.body.id.replace(/"/g,'')
    Students.findByIdAndUpdate(id,req.body,function(err){
      if(err){
        return res.status(500).send('Server err!')
      }
      res.redirect('/students')
    })
})

router.get('/students/delete',function(req,res){
  
  var id = req.query.id.replace(/"/g,'')
  
  Students.findByIdAndRemove(id,function(err){
    if(err){
      return res.status(500).send("Server err!")
    }
    res.redirect('/students')
  })
  
})

//3.将router导出
module.exports = router