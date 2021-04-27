const connection = require('../app/database')

class UserService {

  // 用户注册时 检查数据库中是否有同名用户
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const result = await connection.execute(statement,[name])
    
    return result[0]
  }

  // 将用户插入数据库中
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`
    console.log(user)
    const result = await connection.execute(statement,[name, password])
    
    return result[0]
  }

  // 更新头像
  async updateAvatarUrlById (avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()
