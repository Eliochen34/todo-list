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


app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('This is to do list.')
})