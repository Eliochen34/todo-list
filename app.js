const express = require('express')
const app = express()
const port = 3000

app.get('/', (reqm, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('This is to do list.')
})