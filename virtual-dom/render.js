
const renderElem = ({ tagName, attrs, children }) => {
  const el = document.createElement(tagName)

  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v)
  }

  for (const child of children) {
    const c = render(child)
    el.appendChild(c)
  }

  return el
}

const render = (node) => {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  } 

  return renderElem(node)
}

export default render
