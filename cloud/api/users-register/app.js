const { DuplicatedError } = require('/julia_store/commons/errors')
const usersIndex = require('/julia_store/commons/db').in('users')

module.exports = ({ body: { email, password } }, res) => {
  if (usersIndex.selectOne({ email, password }))
    throw new DuplicatedError(null, { email })

  const created_at = Date.now().toString()
  usersIndex.new().writeMany({ email, password, created_at })
  return res.json({ created_at })
}
