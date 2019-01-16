import createElement from './createElement'
import render from './render'
import mount from './mount'
import diff from './diff'

let keyNumber = 0

const createApp = number => {
  return createElement('div', {
    attrs: {
      id: 'app',
      key: number 
    },
    children: [
      createElement('img', {
        attrs: {
          src: 'https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
        }
      })
    ]
  })
}

const vDOM = createApp(keyNumber)
const app = render(vDOM)
mount(app, document.getElementById('app'))
