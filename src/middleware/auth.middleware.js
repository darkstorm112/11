const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')


const verifyLogin = async (ctx, next) => {
  console.log('验证登录的middleware~')
  // 获取用户账号密码
  const { name, password } = ctx.request.body

  //1、判断账户密码是否为空
  if (!nmae || !password) {
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

  await next()
}

module.exports = {
  verifyLogin
}
