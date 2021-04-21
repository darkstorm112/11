const connection = require('../app/database')

class LabelService {
  async create (content) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [result] = await connection.execute(statement,[content])
    return result
  }

  async getLabelByName (name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async getLabels (limit, offset) {
    const statement = `SELECT * FROM label limit ?, ?;`
    const [result] = await connection.execute(statement, [offset, limit])
    return result
  }
}

module.exports = new LabelService()