const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('This is to do list.')
})