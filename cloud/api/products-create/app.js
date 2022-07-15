const { NotFoundError } = require('/loja_store/commons/errors')
const db = require('/loja_store/commons/db')
const productsIndex = db.in('products')
const loginsIndex = db.in('logins')

module.exports = ({ body: { name }, headers: { login } }, res) => {
  const loginDB = loginsIndex.selectById(login)
  if (!loginDB) throw new NotFoundError('Login not found.')

  const user_id = loginDB.readString('user_id')
  const created_at = Date.now().toString()

  const product = productsIndex.new()
  product.writeMany({ name, created_at, user_id })

  return res.json({ id: product.getId(), created_at })
}
