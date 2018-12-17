class Observer {
  
  constructor(value) {
    if (!value || typeof value !== 'object') {
      return
    }
    this.data = value
    this.start(value)
  }

  start(data) {
    Object.keys(data).forEach(key => {
      let value = data[key]
      // new Observer(value)
      Object.defineProperty(data, key, {
        enumerable: true,
        get() {
          return value
        },
        set(newVal) {
          if (newVal === value) {
            return
          }
          value = newVal
          watchers[key].update(value)
        }
      })
    })
  }

}


class Watcher {
  constructor(key, cb) {
    this.key = key
    this.cb = cb
  }

  update(value) {
    this.cb(value)
  }
}
