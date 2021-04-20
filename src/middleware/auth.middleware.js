const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')


const verifyLogin = async (ctx, next) => {
  console.log('验证登录的middleware~')
  // 获取用户账号密码
  const { name, password } = ctx.request.body

  //1、判断账户密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  //2、通过名字查询数据库 看是否有数据查询出来
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  //3、判断密码是否和数据库中密码一致 （加密）
  if (user.password !== md5password(password)) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  console.log('验证授权的middleware~')

  try {
    //获取 token
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '')
    //验证token
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    ctx.user = result
    await next()

  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  console.log('验证权限的middleware~')
  try{
    //1、获取参数 { commentId }
    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id','')
    const resourceId = ctx.params[resourceKey]
    const { id } = ctx.user


    // 2、查看是否拥有权限
    const isPermission = await authService.checkResource(tableName, resourceId, id)
    if(!isPermission) throw new Error()
    await next()
 
  }catch(err){
    console.log(err)
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error',error,ctx)
  }

  
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
