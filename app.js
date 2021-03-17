var express = require('express')

var app = express()

var fs = require('fs')

var router = require('./router')

var bodyParser = require('body-parser')

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public',express.static('./public/'))

app.engine('html',require('express-art-template'))
//配置body-parser  一定要在路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(3000,function(){
    console.log("3000 running...")
})
