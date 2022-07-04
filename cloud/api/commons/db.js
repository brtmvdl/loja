const pathPkg = require('path')
const fsPkg = require('fs')

class DataObject {
  params = {}

  constructor(dir, id) {
    this.params.dir = dir
    this.params.id = id
    this.params.path = pathPkg.join(dir, id)

    fsPkg.mkdirSync(this.params.path, { recursive: true })
  }

  getId() {
    return this.params.id
  }

  propName(name) {
    return pathPkg.join(this.params.path, name)
  }

  read(name) {
    return fsPkg.readFileSync(this.propName(name))
  }

  readUnsafeString(name = '') {
    return this.read(name).toString()
  }

  readString(name = '') {
    return this.readUnsafeString(name).replace(/\s+/ig, '')
  }

  writeString(name, content) {
    fsPkg.writeFileSync(this.propName(name), content)
    return this
  }

  writeMany(many) {
    Object.keys(many)
      .map((key) => this.writeString(key, many[key]), this)

    return this
  }

  toJSON() {
    const json = {}

    const files = fsPkg.readdirSync(this.params.path)
    Object.keys(files).map((name) => { json[name] = this.readString(name) }, this)

    return this
  }
}

class DataBase {

  params = {}

  constructor(dir) {
    this.params.dir = dir

    fsPkg.mkdirSync(dir, { recursive: true })
  }

  in(dir) {
    return new DataBase(pathPkg.join(this.params.dir, dir))
  }

  new() {
    const id = Date.now().toString() // FIXME: uuid
    return new DataObject(this.params.dir, id)
  }

  list() {
    return fsPkg.readdirSync(this.params.dir)
      .map((param) => new DataObject(this.params.dir, param), this)
  }

  listJSON() {
    return this.list().map(item => item.toJSON())
  }

  select(params = {}) {
    return this.list()
      .filter((data) => Object.keys(params)
        .every((param) => data.readString(param) === params[param].toString())
      )
  }

  selectJSON(params = {}) {
    return this.select(params).map(provider => provider.toJSON())
  }

  selectById(id) {
    return this.list()
      .filter((data) => data.getId() === id.toString())
      .find(data => data)
  }

  selectOne(params = {}) {
    return this.select(params).find(data => data)
  }
}

module.exports = new DataBase(process.env.DATA_PATH)
