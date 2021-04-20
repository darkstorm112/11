const commentService = require('../service/comment.service')

class CommentController {
  async create (ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    const result = await commentService.create(id, momentId, content)
    ctx.body = result
  }

  async reply (ctx, next) {
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.params
    const { id } = ctx.user
    const result = await commentService.reply(id, momentId, commentId, content)
    ctx.body =  result
  }

  async update (ctx, next) {
    const { content } = ctx.request.body
    const { commentId } = ctx.params
    const { id } = ctx.user
    const result = await commentService.update(content, commentId, id)
    ctx.body = result
  }

  async remove (ctx, next) {
    const { commentId } = ctx.params
    const { id } = ctx.user
    const result = await commentService.remove(commentId,id)
    ctx.body = result
  }

  async list (ctx, next) {
    const { momentId } = ctx.query
    const result = await commentService.getCommentsByMomentId(momentId)
    ctx.body = result
  }
}

module.exports = new CommentController()