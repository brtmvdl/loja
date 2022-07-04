const db = require('/julia_store/commons/db')
const providersIndex = db.in('providers')
const loginsIndex = db.in('logins')

module.exports = ({ headers: { login } }, res) => {
  const loginDB = loginsIndex.selectById(login)
  const user_id = loginDB.readString('user_id')

  return res.json({
    list: providersIndex.selectJSON({ user_id })
  })
}
