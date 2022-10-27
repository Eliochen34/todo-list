// 引用Express與Express路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home') // 引入home模組程式碼
const todos = require('./modules/todos') // 引入todos模組程式碼
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth') // 掛載 middleware


router.use('/todos', authenticator, todos) // 將網址結構符合 /todos字串開頭的request導向todos模組
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 將網址結構符合 / 字串的request導向home模組

// 匯出路由器
module.exports = router