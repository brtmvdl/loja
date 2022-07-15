const db = require('/loja_store/commons/db')
const productsIndex = db.in('products')
const loginsIndex = db.in('logins')

module.exports = ({ headers: { login } }, res) => {
  loginsIndex.selectById(login)

  return res.json({ list: [] }) // TODO
}

