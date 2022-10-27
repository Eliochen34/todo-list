const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Todo = require('../todo')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      // 用Promise.all這個語法等待裡面的事情都做完，下一個then才會發生
      return Promise.all(Array.from(
        { length: 10 }, // Array.from會生成['', '', '', '', ....10個東西的陣列]
        (_, i) => Todo.create({ name: `name-${i}`, userId }) // 如同執行['', '', ....].map(() => ...)
        // 最後會裝滿Todo.create產生出來的東西的陣列，長度為10
      ))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})
