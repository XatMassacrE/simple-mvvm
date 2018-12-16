
class Compile {

  constructor(el, vm) {
    this.vm = vm
    const node = document.querySelector(el)
    this.fragments = this.node2Fragments(node)

    this.replaceTemplate(this.fragments)
    node.appendChild(this.fragments)
  }

  node2Fragments(node) {
    let fragments = document.createDocumentFragment()

    while(node.firstChild) {
      fragments.appendChild(node.firstChild)
    }
    return fragments
  }

  replaceTemplate(fragments) {
    const nodes = fragments.childNodes
    Array.from(nodes).forEach(node => {
      let text = node.textContent
      const reg = /\{\{(.*)\}\}/

      if (reg.test(text)) {
        const key = RegExp.$1
        node.textContent = text.replace(reg, this.vm[key])
      }
      console.log(node)

      if (node.childNodes && node.childNodes.length > 0) {
        this.replaceTemplate(node)
      }
    })

  }

}
