const connection = require('../app/database')

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
    const [result] = await connection.execute(statement,[content, userId])
    console.log(result)
    return result
  }

  async list(offset, limit) {
    const statement = `SELECT id momentId, content, user_id userId, createAt,updateAt FROM moment LIMIT ?, ?;`
    const [result] = await connection.execute(statement,[offset,limit])
    console.log(result)
    return result
  }

  async detail(momentId) {
    const statement = `SELECT * FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement,[momentId])
    console.log(result)
    return result[0]||'暂无数据'
  }

  async update (content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async remove (momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result 
  }
}

module.exports = new MomentService()