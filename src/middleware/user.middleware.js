const errorTypes = require('../constants/error-types')

const verifyUser = async (ctx,next) => {
  //1、获取用户名和密码
  const { name, password } = ctx.request.body 

  //2、判断用户名和密码不能为空
  if(!name || !password){
    const error = new Error()
    return 
  }

  //3、判断这次注册的用户名是没有注册过

}

module.exports = {
  verifyUser
}