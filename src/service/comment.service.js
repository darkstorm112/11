const connection = require('../app/database')
const commentRouter = require('../router/comment.router')


class CommentService {
  async create (userId, momentId, content) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    const result = await connection.execute(statement,[content, momentId, userId])
    return result
  }

  async reply (userId, momentId, commentId, content) {
    try {
      const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`
      const [result] = await connection.execute(statement,[content, momentId, userId, commentId])
      console.log(result)
      return result
    }catch (err){
      console.log(err)
    }
  }

  async update(content, commentId, userId) {
    try{
      const statement = `UPDATE comment SET content = ? WHERE id = ? AND user_id = ?;`
      const [result] = await connection.execute(statement, [content, commentId, userId])
      return result
    }catch (err){
      console.log(err)
    }
  }

  async remove (commentId, userId) {
    try{
      const statement = `DELETE FROM comment WHERE id = ?  and user_id = ?;`
      const [result] = await connection.execute(statement,[commentId, userId])
      return result
    }catch (err){
      console.log(err)
    }
  }

  async getCommentsByMomentId (momentId) {
    try{
      const statement = `SELECT * FROM comment WHERE moment_id = ?;`
      const result = await connection.execute(statement,[momentId])
      return result[0]
    }catch (err){
      console.log(err)
    }
  }
}

module.exports = new CommentService()