const db = require('/julia_store/commons/db')
const { NotFoundError } = require('/julia_store/commons/errors')
const loginIndex = db.in('logins')
const userIndex = db.in('users')

module.exports = ({ body: { email, password } }, res) => {
  const user = userIndex.selectOne({ email, password })

  if (!user) {
    return res.error(new NotFoundError('User not found.', { email }))
  }

  const created_at = Date.now().toString()
  const login = loginIndex.new().writeMany({
    user_id: user.getId(),
    created_at,
  })

  return res.json({
    token: login.getId(),
    created_at
  })
}
