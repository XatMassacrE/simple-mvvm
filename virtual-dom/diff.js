import render from './render'

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = []
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(node => {
      node.setAttribute(k, v)
      return node
    })
  }

  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(node => {
        node.removeAttribute(k)
        return node
      })
    }
  }

  return node => {
    for (const patch in patchAttrs) {
      patch(node)
    }
  }

}

const diff = (oldNode, newNode) => {

  if (newNode === undefined) {
    return node => {
      node.remove()
      return undefined
    }
  }

  if (typeof oldNode === 'string' || typeof newNode === 'string') {
    if (oldNode !== newNode) {
      return node => {
        const _newNode = render(newNode)
        node.replaceWith(_nodeNode)
        return _newNode
      }
    } else {
      return node => undefined
    }
  }

  if (oldNode.tagName !== newNode.tagName) {
    return node => {
      const _newNode = render(newNode)
      node.replaceWith(_nodeNode)
      return _newNode
    }
  }

  const patchAttrs = diffAttrs(oldNode.attrs, newNode.attrs)
  // const patchChildren = diffChildren(oldNode.children, newNode.children)

  return node => {
    patchAttrs(node)
    // patchChildren(node)
    return node
  }
}

export default diff
