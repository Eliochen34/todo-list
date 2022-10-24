const express = require('express') // 引用Express
const exphbs = require('express-handlebars') // 引用express-hbs
const bodyParser = require('body-parser') // 引用body-parser，處理body
const methodOverride = require('method-override')
const session = require('express-session')

const routes = require('./routes') // 掛載路由器
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: "ThisIsMySecret",
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true })) // 規定每一筆請求都要經過body-parser進行前置處理
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})