const Router = require('koa-router')
const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

const {
  verifyLabelExists
} = require('../middleware/label.middleware')

const { 
  create,
  list,
  detail,
  update,
  remove,
  addLabels
} = require('../controller/moment.controller')

const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/', verifyAuth, create)

momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)

//修改、删除 ==》 1、用户必须登录；2、用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 给动态添加标签
momentRouter.post('/:mommentId', verifyAuth, verifyPermission, verifyLabelExists, addLabels)


module.exports = momentRouter