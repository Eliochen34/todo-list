const express = require('express') // 引用Express
const app = express()
const port = 3000
const Todo = require('./models/todo') // 引用/models路徑下的todo.js這個檔案

const bodyParser = require('body-parser') // 引用body-parser，處理body
app.use(bodyParser.urlencoded({ extended: true })) // 規定每一筆請求都要經過body-parser進行前置處理

const exphbs = require('express-handlebars') // 引用express-hbs
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

const mongoose = require('mongoose') // 引用mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// 掛載路由器
const routes = require('./routes')
app.use(routes)


// 路由清單

// // 顯示新增todo的頁面
// app.get('/todos/new', (req, res) => {
//   return res.render('new')
// })

// // 新增todo功能
// app.post('/todos', (req, res) => {
//   const name = req.body.name
//   return Todo.create({ name })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// // 顯示單一todo的畫面
// app.get('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('detail', { todo }))
//     .catch(error => console.log(error))
// })

// // 顯示edit畫面
// app.get('/todos/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('edit', { todo }))
//     .catch(error => console.log(error))
// })

// // 編輯todo功能
// app.put('/todos/:id', (req, res) => {
//   const id = req.params.id
//   const {name, isDone} = req.body
//   return Todo.findById(id)
//     .then(todo => {
//       todo.name = name
//       todo.isDone = isDone === 'on' // 後面的isDone如果是true，則todo.isDone就為true
//       return todo.save()
//     })
//     .then(() => res.redirect(`/todos/${id}`))
//     .catch(error => console.log(error))
// })

// // 刪除todo功能
// app.delete(('/todos/:id'), (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .then(todo => todo.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

app.listen(port, () => {
  console.log('This is to do list.')
})