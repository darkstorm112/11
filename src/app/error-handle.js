const errorType = require('../constants/error-types')


const errorHandle = (error, ctx) => {
  let status, message;
  console.log(error.message)
  console.log(errorType)
  console.log(errorType.USER_ALREADY_EXISTS===error.message)
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // Bad Request
      message = "用户名或者密码不能为空~"
      break
    case errorType.USER_ALREADY_EXISTS:
      status = 409 // conflict
      message = "用户名已存在~"
      break
    default:
      status = 404
      message = "NOT FOUND"
      break
  }

  ctx.status = status
  ctx.body = message

}

module.exports = errorHandle