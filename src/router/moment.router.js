const Router = require('koa-router')
const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')


const { 
  create,
  list,
  detail,
  update
} = require('../controller/moment.controller')

const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/', verifyAuth, create)

momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)


module.exports = momentRouter