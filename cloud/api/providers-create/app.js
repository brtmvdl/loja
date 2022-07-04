const { NotFoundError } = require('/julia_store/commons/errors')
const db = require('/julia_store/commons/db')
const providersIndex = db.in('providers')
const loginsIndex = db.in('logins')

module.exports = ({ body: { name }, headers: { login } }, res) => {
  const loginDB = loginsIndex.selectById(login)
  if (!loginDB) throw new NotFoundError('Login not found.')

  const user_id = loginDB.readString('user_id')
  const created_at = Date.now().toString()

  const provider = providersIndex.new()
  provider.writeMany({ name, created_at, user_id })

  return res.json({ id: provider.getId(), created_at })
}
