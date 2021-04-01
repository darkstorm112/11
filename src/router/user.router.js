const Router = require('koa-router')

const { verifyUser } = require('../controller/user.controller')
const { verifyUser } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'})

userRouter.post('/',verifyUser)

module.exports = userRouter