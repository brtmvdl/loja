const { DuplicatedError } = require('/julia_store/commons/errors')
const userIndex = require('/julia_store/commons/db').in('users')

module.exports = ({ body: { email } }, res) => {
  if (userIndex.select({ email }).length)
    throw new DuplicatedError({ email })

  const created_at = Date.now().toString()
  userIndex.new().writeMany({ email, created_at })
  return res.json({ created_at })
}
