const db = require('/mercado/commons/db')
const loginIndex = db.in('logins')
const userIndex = db.in('users')

const usersCreate = ({ name = '', email }) => {
  const user = userIndex.new()
  user.writeMany({ name, email })
  return user
}

module.exports = ({ body: { email } }, res) => {
  let user = userIndex.find({ email })

  if (!user) {
    user = usersCreate({ email })
  }

  const login = loginIndex.new()

  login.writeMany({
    user_id: user.getId(),
    created_at: Date.now().toString(),
  })

  return res.json({ token: login.getId() })
}

module.exports.usersCreate = usersCreate
