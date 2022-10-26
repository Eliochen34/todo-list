const express = require('express') // 引用Express
const exphbs = require('express-handlebars') // 引用express-hbs
const bodyParser = require('body-parser') // 引用body-parser，處理body
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const routes = require('./routes') // 掛載路由器

// 載入設定檔，要寫在express-session之後
const usePassport = require('./config/passport')
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

usePassport(app) // 呼叫Passport函式並傳入app，要寫在路由之前

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})