// 引用Express與Express路由器
const express = require('express')
const router = express.Router()
// 引用Todo model
const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(todos => res.render('index', { todos }))
    .catch(err => console.log(err))
})
// 匯出路由器
module.exports = router

