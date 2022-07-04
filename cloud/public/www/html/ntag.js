
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
    this.element = element
    return this
  }

  focus() {
    this.element.focus()
    return this
  }

  attr(name, value) {
    this.element.setAttribute(name, value)
    return this
  }

  setStyle(name, value) {
    this.element.style[name] = value
    return this
  }

  setStyleContainer(name, value) {
    this.container.style[name] = value
    return this
  }

  setText(text) {
    this.element.innerText = text
    return this
  }

  getText() {
    return this.element.innerText
  }

  append(ntag = new nTag) {
    this.element.append(ntag.render())
    return this
  }

  set(ntag = new nTag) {
    this.element.childNodes.forEach(c => c.emove())
    this.element.append(ntag.render())
    return this
  }

  on(name, func) {
    this.element.addEventListener(name, func)
    return this
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
    this.element.value = value
    return this
  }

  getValue() {
    return this.element.value
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
    return this
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
    return this
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
    this.element.rows = rows
    return this
  }

  placeholder(text = '') {
    const self = this
    self.attr('placeholder', text)
    return this
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
    return this
  }

  accept(accept = '*/*') {
    const self = this
    self.attr('accept', accept)
    return this
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
    this.element.href = url
    return this
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
  }
}

class nSpan extends nTag {
  constructor() {
    super({
      component: { name: 'span' },
      element: { tagName: 'span' },
    })
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
    return this
  }

  alt(alt) {
    const self = this
    self.attr('alt', alt)
    return this
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

  header = new nTag()
  body = new nTag()
  footer = new nTag()

  constructor() {
    super({ component: { name: 'container-component' } })

    this.setStyle('margin', '0 auto')

    switch (window.innerWidth) {
      case '1366': this.setStyle('width', '80em'); break;
    }

    super.append(this.header)

    const middle = new nFlex()

    this.body.setStyleContainer('width', '69%')
    middle.append(this.body)

    super.append(middle)

    super.append(this.footer)
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
    return this
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

            this.element.dispatchEvent(event)
          })
      })
    })
    self.append(self.file_input)
  }
}

class nCard extends nTag {
  header = new nTag()
  body = new nTag()
  footer = new nTag()

  constructor() {
    super({ component: { name: 'card' } })

    // this.setStyle('padding', '1em')

    super.append(this.header)
    super.append(this.body)
    super.append(this.footer)
  }
}
