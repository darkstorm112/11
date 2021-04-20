
const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    // 1、获取数据（user_id, content）
    const userId = ctx.user.id
    const content = ctx.request.body.content

    // 2、将数据插入数据库中
    const result = await momentService.create(userId, content)
    ctx.body = result
  }

  async list(ctx, next) {

    // 从哪开始，请求多少条
    const { offset, size } = ctx.query

    console.log(ctx.query)

    // 请求数据
    const result = await momentService.list(offset, size)
    ctx.body = result
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.detail(momentId)
    ctx.body = result
  }

  async update(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    // 修改内容
    const result = await momentService.update(content, momentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    // 获取momentId
    const { momentId } = ctx.params

    // 删除内容
    const result = await momentService.remove(momentId)
    ctx.body = result
  }
}

module.exports = new MomentController()