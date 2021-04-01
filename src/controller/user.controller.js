
const userService = require('../service/user.service')


class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body

    // 查询数据
    const result = await userService.create(user)
  }
}

module.exports = new UserController()




