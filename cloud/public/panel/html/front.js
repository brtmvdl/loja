
const Translator = {
  translations: {
    'pt-br': {
      'Can not duplicate this item.': 'Esse item não pode ser duplicado.',
      'User not found.': 'Usuário não encontrado.',
    },
  },
  in: (language) => ({
    translate: (phrase) => Translator.translations[language][phrase] || '--'
  })
}

const Flow = {}

Flow.goTo = (url) => (window.location = url)

class nTag {

  constructor(options = {}) {
    if (options?.element?.tagName) {
      this.element = document.createElement(options?.element?.tagName)
    }

    if (options?.container?.tagName) {
      this.container = document.createElement(options?.container?.tagName)
    }

    const name = options?.component?.name || 'undefined'
    this.container.classList.add(`ct-${name}`)
    this.element.classList.add(`el-${name}`)

    this.setStyle('outline', 'none')
    this.setStyle('box-sizing', 'border-box')
  }

  container = document.createElement('div')
  element = document.createElement('div')

  inContainer = {
    before: [],
    after: [],
  }

  static fromElement(el, options = {}) {
    const component = new nTag(options)
    component.loadElement(el)
    return component
  }

  static fromId(id, options) {
    return nTag.fromElement(document.getElementById(id), options)
  }

  loadElement(element) {
    const self = this
    self.element = element
    return self
  }

  focus() {
    const self = this
    self.element.focus()
    return self
  }

  attr(name, value) {
    const self = this
    self.element.setAttribute(name, value)
    return self
  }

  setStyle(name, value) {
    const self = this
    self.element.style[name] = value
    return self
  }

  setStyleContainer(name, value) {
    const self = this
    self.container.style[name] = value
    return self
  }

  setText(text) {
    const self = this
    self.element.innerText = text
    return self
  }

  getText() {
    const self = this
    return self.element.innerText
  }

  append(ntag = new nTag) {
    const self = this
    self.element.append(ntag.render())
    return self
  }

  set(ntag = new nTag) {
    const self = this
    self.element.childNodes.forEach(c => c.emove())
    self.element.append(ntag.render())
    return self
  }

  on(name, func) {
    const self = this
    self.element.addEventListener(name, func)
    return self
  }

  render() {
    const self = this

    self.inContainer.before.map(c => self.container.append(c.render()))
    self.container.append(self.element)
    self.inContainer.after.map(c => self.container.append(c.render()))

    return self.container
  }
}

class nValuable extends nTag {

  setValue(value) {
    const self = this
    self.element.value = value
    return self
  }

  getValue() {
    const self = this
    return self.element.value
  }

}

class nTextInput extends nValuable {
  constructor() {
    super({
      component: { name: 'text-input' },
      element: { tagName: 'input' }
    })

    this.attr('type', 'text')

    this.setStyle('box-shadow', '0 0 0.1em 0 black')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('margin', '0 0 0.5em 0')
    this.setStyle('padding', '0.5em')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
  }

  placeholder(text = '') {
    const self = this
    self.attr('placeholder', text)
    return self
  }
}

class nPasswordInput extends nValuable {
  constructor() {
    super({
      component: { name: 'text-input' },
      element: { tagName: 'input' }
    })

    this.attr('type', 'password')

    this.setStyle('box-shadow', '0 0 0.1em 0 black')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('margin', '0 0 0.5em 0')
    this.setStyle('padding', '0.5em')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
  }

  placeholder(text = '') {
    const self = this
    self.attr('placeholder', text)
    return self
  }
}

class nTextarea extends nValuable {
  constructor() {
    super({
      component: { name: 'textarea' },
      element: { tagName: 'textarea' }
    })

    this.setStyle('box-shadow', '0 0 0.1em 0 black')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('margin', '0 0 0.5em 0')
    this.setStyle('padding', '0.5em')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('resize', 'none')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
  }

  setRows(rows) {
    const self = this
    self.element.rows = rows
    return self
  }

  placeholder(text = '') {
    const self = this
    self.attr('placeholder', text)
    return self
  }
}

class nFileInput extends nValuable {
  constructor() {
    super({
      component: { name: 'file-input' },
      element: { tagName: 'input' }
    })

    const self = this

    self.attr('type', 'file')
  }

  multiple() {
    const self = this
    self.attr('multiple', true)
    return self
  }

  accept(accept = '*/*') {
    const self = this
    self.attr('accept', accept)
    return self
  }
}

class nText extends nValuable {
  constructor() {
    super({ component: { name: 'text' } })
  }
}

class nTextError extends nText {
  constructor() {
    super({ component: { name: 'text-error' } })

    this.setStyle('color', 'red')
  }
}

class nH1 extends nText {
  constructor() {
    super({ component: { name: 'h1' } })

    this.setStyleContainer('display', 'inline-block')
    this.setStyleContainer('width', '100%')
    this.setStyle('text-align', 'center')
    this.setStyle('font-size', '3em')
  }
}

class nH2 extends nH1 {
  constructor() {
    super({ component: { name: 'h2' } })

    this.setStyle('font-size', '1.5em')
  }
}

class nButton extends nTag {
  constructor() {
    super({
      component: { name: 'button' },
      element: { tagName: 'button' }
    })

    this.setStyle('display', 'inline-block')
    this.setStyle('margin', '0 0 0.5em 0')
    this.setStyle('padding', '0.5em')
    this.setStyle('cursor', 'pointer')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('background-color', '#dddddd')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
  }
}

class nLink extends nTag {
  constructor() {
    super({
      component: { name: 'link' },
      element: { tagName: 'a' }
    })

    this.setStyleContainer('text-align', 'center')
    this.setStyle('text-decoration', 'none')
  }

  href(url) {
    const self = this
    self.element.href = url
    return self
  }
}

class nCenterForm extends nTag {
  constructor() {
    super({ component: { name: 'center-form' } })

    this.setStyleContainer('margin', '2em auto')
    this.setStyleContainer('width', '30em')

    this.setStyle('background-color', '#ffffff')
    this.setStyle('display', 'inline-block')
    this.setStyle('padding', '1em')
    this.setStyle('width', '100%')
  }
}

class nFlex extends nTag {
  constructor() {
    super({
      component: { name: 'flex' }
    })

    this.setStyle('display', 'flex')
    // this.setStyle('justify-content', 'space-between')
  }
}

class nImage extends nTag {
  constructor() {
    super({
      component: { name: 'image' },
      element: { tagName: 'img' }
    })

    this.setStyle('max-width', '100%')
  }

  src(src) {
    const self = this
    self.attr('src', src)
    return self
  }

  alt(alt) {
    const self = this
    self.attr('alt', alt)
    return self
  }
}

class nButtonLink extends nLink {
  constructor() {
    super({ component: { name: 'button-link' } })

    this.setStyle('background-color', '#dddddd')
    this.setStyle('box-shadow', 'border-box')
    this.setStyle('display', 'inline-block')
    this.setStyle('color', '#000000')
    this.setStyle('padding', '1em')
    this.setStyle('width', '100%')
  }
}

// components

class nContainerComponent extends nTag {

  top = new nTag()
  left = new nTag()
  right = new nTag()
  bottom = new nTag()

  constructor() {
    super({
      component: { name: 'container-component' },
    })

    this.setStyle('margin', '0 auto')
    this.setStyle('width', '50em')

    super.append(this.top)

    const middle = new nFlex()

    this.left.setStyleContainer('width', '69%')
    middle.append(this.left)

    this.right.setStyleContainer('width', '30%')
    middle.append(this.right)

    super.append(middle)

    super.append(this.bottom)
  }

  append() {
    throw new Error('Can not do this.')
  }
}

class nTextInputComponent extends nTag {
  label = new nText()
  input = new nTextInput()
  error = new nTextError()

  constructor() {
    super({ component: { name: 'text-input-component' } })

    this.label.setStyle('margin', '0 0 0.5em 0')
    this.error.setStyle('margin', '0 0 0.5em 0')

    super.append(this.label)
    super.append(this.input)
    super.append(this.error)
  }
}

class nPasswordInputComponent extends nTag {
  label = new nText()
  input = new nPasswordInput()
  error = new nTextError()

  constructor() {
    super({ component: { name: 'password-input-component' } })

    this.label.setStyle('margin', '0 0 0.5em 0')
    this.error.setStyle('margin', '0 0 0.5em 0')

    super.append(this.label)
    super.append(this.input)
    super.append(this.error)
  }
}

class nTextareaComponent extends nTag {
  label = new nText()
  textarea = new nTextarea()
  error = new nTextError()

  constructor() {
    super({ component: { name: 'textarea-component' } })

    this.label.setStyle('margin', '0 0 0.5em 0')
    this.error.setStyle('margin', '0 0 0.5em 0')

    super.append(this.label)
    super.append(this.textarea)
    super.append(this.error)
  }
}

class nGalleryComponent extends nTag {
  items = []

  constructor() {
    super({ component: { name: 'gallery-component' } })
  }

  append(item = new nTag) {
    const self = this
    self.items.push(item)
    super.append(item)
    return self
  }
}

class nGalleryItemComponent extends nTag {
  image = new nImage()
  title = new nText()
  subtitle = new nText()

  constructor() {
    super({ component: { name: 'gallery-item-component' } })

    const self = this

    self.setStyle('padding', '1em')
    self.setStyle('background-color', '#cccccc')

    self.title.setStyle('text-align', 'center')
    self.subtitle.setStyle('text-align', 'center')

    self.append(self.image)
    self.append(self.title)
    self.append(self.subtitle)
  }
}

class nFileButtonComponent extends nTag {
  button = new nButton()
  file_input = new nFileInput()

  constructor() {
    super({ component: { name: 'file-button-component' } })

    const self = this

    self.button.setText('Adicionar arquivos')
    self.button.on('click', () => self.file_input.element.click())
    self.append(self.button)

    self.file_input.setStyle('display', 'none')
    self.file_input.on('change', ({ target: { files } }) => {
      const filesArr = Array.from(files)
      filesArr.map((file) => {
        const { name, size, type } = file
        Api.upload(file, { name, size, type })
          .then((response) => {
            const id = response.get('id')
            const event = new Event('fileloaded')

            event.file = {
              url: `http://0.0.0.0/files/${id}/file`,
              id: id,
              name: name,
              size: size,
              type: type,
            }

            self.element.dispatchEvent(event)
          })
      })
    })
    self.append(self.file_input)
  }
}
