// 引用Express與Express路由器
const express = require('express')
const router = express.Router()

// 引入home模組程式碼
const home = require('./modules/home')
// 引入todos模組程式碼
const todos = require('./modules/todos')
const users = require('./modules/users')


// 將網址結構符合 / 字串的request導向home模組
router.use('/', home)
// 將網址結構符合 /todos字串開頭的request導向todos模組
router.use('/todos', todos)
router.use('/users', users)

// 匯出路由器
module.exports = router