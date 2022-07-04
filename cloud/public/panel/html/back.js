
const ErrorTypes = {
  VALIDATION: 'validation',
  RESPONSE: 'error-response',
}

const AppData = {}

AppData.get = (key) => JSON.parse(localStorage.getItem(key))
AppData.set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

const Validation = {
  email: (errorMessage = 'E-mail invalido.') => (value) => !!(value.toString().match(/@/ig)) ? null : errorMessage,
  required: (errorMessage = 'Campo obrigatório') => (value) => !!value ? null : errorMessage,
}

const Validator = {}

Validator.errors = function (errors = {}) {
  const self = this

  self.type = ErrorTypes.VALIDATION

  self.toJSON = () => errors

  self.get = (name) => self.toJSON()[name]
}

Validator.with = (fields) => {
  return {
    validate: (object) => new Promise((resolve, reject) => {
      const errors = {}

      Object.keys(object)
        .map((name) => {
          const arr = object[name] || []
          const error = arr.map((val) => val(fields[name])).find(err => err)
          if (error) errors[name] = error
        })

      if (Object.keys(errors).length) reject(new Validator.errors(errors))
      else resolve()
    })
  }
}

const Ajax = {}

Ajax.BASE_URL = 'http://0.0.0.0/api/v1'

Ajax.SuccessResponse = function ({ responseText }) {
  const self = this

  self.type = 'success'

  self.toJSON = () => JSON.parse(responseText)

  self.getData = () => self.toJSON()['data']

  self.get = (name) => self.getData()[name]
}

Ajax.ErrorResponse = function ({ responseText }) {
  const self = this

  self.type = 'error-response'

  self.toJSON = () => JSON.parse(responseText)

  self.getData = () => self.toJSON()['data']

  self.get = (name) => self.getData()[name]

  self.getMessage = () => self.toJSON()['message']

  self.getStatus = () => self.toJSON()['status']
}

Ajax.request = (method, url, data) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)

  xhr.setRequestHeader('X-PARAM-login', AppData.get('login'))

  const onComplete = (xhr) => {
    if ([200, '200'].indexOf(xhr.status) !== -1) {
      resolve(new Ajax.SuccessResponse(xhr))
    } else {
      reject(new Ajax.ErrorResponse(xhr))
    }
  }

  xhr.onload = () => onComplete(xhr)
  xhr.onerror = () => onComplete(xhr)

  xhr.send(data)
})

Ajax.post = (paths = [], data) =>
  Ajax.request('POST', [Ajax.BASE_URL, ...paths].join('/'), JSON.stringify(data))

Ajax.upload = (file, { name, size, type } = {}) => {
  const data = new FormData()

  data.append('file', file)
  data.append('name', name)
  data.append('size', size)
  data.append('type', type)

  return Ajax.request('POST', [Ajax.BASE_URL, 'upload'].join('/'), data)
}

const Api = {}

Api.usersLogin = ({ email, password } = {}) =>
  Validator.with({ email, password })
    .validate({
      email: [Validation.email()],
      password: [Validation.required()],
    })
    .then(() => Ajax.post(['users', 'login'], { email, password }))
    .then((resp) => AppData.set('login', resp.get('token')))
    .then(() => Flow.goTo('dashboard.html'))

Api.usersRegister = ({ email, password } = {}) =>
  Validator.with({ email, password })
    .validate({
      email: [Validation.email()],
      password: [Validation.required()],
    })
    .then(() => Ajax.post(['users', 'register'], { email, password }))
    .then(() => Flow.goTo('login.html'))

Api.newsCreate = ({ title, text, files } = {}) =>
  Validator.with({ title, text, files })
    .validate({
      title: [Validation.required(),],
      text: [Validation.required(),],
      files: [Validation.required(),],
    })
    .then(() => Ajax.post(['news', 'create'], { title, text, files }))

Api.providersList = ({ search } = {} = {}) =>
  Ajax.post(['providers', 'list'], { search })

Api.providersCreate = ({ name } = {}) =>
  Validator.with({ name })
    .validate({
      name: [Validation.required(),],
    })
    .then(() => Ajax.post(['providers', 'create'], { name }))
    .then(() => Flow.goTo('dashboard.html'))

Api.productsList = ({ search } = {} = {}) =>
  Ajax.post(['products', 'list'], { search })

Api.productsCreate = ({ name, price, photos } = {}) =>
  Validator.with({ name, price, photos })
    .validate({
      name: [Validation.required()],
      price: [Validation.required()],
      photos: [Validation.required()],
    })
    .then(() => Ajax.post(['products', 'create'], { name, price, photos }))
    .then(() => Flow.goTo('dashboard.html'))

Api.upload = (file, { name, size, type } = {}) =>
  Ajax.upload(file, { name, size, type })

