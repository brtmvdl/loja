const db = require('/julia_store/commons/db')
const loginIndex = db.in('logins')
const userIndex = db.in('users')

const usersCreate = ({ email }) =>
  userIndex.new().writeMany({ email })

module.exports = ({ body: { email } }, res) => {
  let user = userIndex.select({ email })

  if (!user) user = usersCreate({ email })

  const login = loginIndex.new()
  const user_id = user.getId()
  const created_at = Date.now().toString()
  login.writeMany({ user_id, created_at })

  return res.json({ token: login.getId() })
}
