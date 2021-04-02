const Router = require('koa-router')

const authRouter = new Router()

const {
  verifyLogin
} = require('../middleware/auth.middleware')

authRouter.post('/login',verifyLogin)

module.exports = authRouter

