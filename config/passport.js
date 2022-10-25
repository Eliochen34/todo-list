const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

module.exports = app => {
  // passport初始化，並給app使用
  app.use(passport.initialize())
  app.use(passport.session())

  // 登入驗證機制
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!'})
        }
        if (user.password !== password){
          return done(null, false, { message: 'Email or Password incorrect.'})
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  // 序列化
  passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user.id)
  })
  // 反序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}