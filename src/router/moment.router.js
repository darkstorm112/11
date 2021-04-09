const Router = require('koa-router')
const { 
  verifyLogin, 
  verifyAuth 
} = require('../middleware/auth.middleware')


const { create } = require('../service/moment.service')

const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/', verifyAuth, create)


module.exports = momentRouter