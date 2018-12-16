
class Compile {

  constructor(el, vm) {
    this.vm = vm
    const node = document.querySelector(el)
    this.fragments = this.node2Fragments(node)

    this.compile(this.fragments)
    node.appendChild(this.fragments)
  }

  node2Fragments(node) {
    let fragments = document.createDocumentFragment()

    while(node.firstChild) {
      fragments.appendChild(node.firstChild)
    }
    return fragments
  }

  compile(fragments) {
    const nodes = fragments.childNodes
    Array.from(nodes).forEach(node => {
      
      /*
       * nodeType:
       * 1: elementNode
       * 3: textNode
       */
      if (node.nodeType == 1) {
        this.compileElementNode(node)

      } else if (node.nodeType == 3) {
        this.replaceTemplate(node)
      }
      
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  compileElementNode(node) {
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name
      if (attrName.indexOf('v-on') == 0) {
        const value = attr.value
        const eventType = attrName.split(':')[1]
        const fn = this.vm._options.methods[value]
        this.addEvent(node, eventType, fn)
      }
      node.removeAttribute(attrName)
    })
  }

  replaceTemplate(node) {
    const text = node.textContent
    const reg = /\{\{(.*)\}\}/
    if (reg.test(text)) {
      const key = RegExp.$1
      node.textContent = this.vm[key]
    }
  }

  addEvent(node, eventType, fn) {
    node.addEventListener(eventType, fn.bind(this.vm))
  }

}
