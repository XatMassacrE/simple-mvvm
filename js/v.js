
class V {

  constructor(options) {
    this._options = options
    this._data = this._options.data
    Object.keys(this._data).forEach(key => {
      this._proxy(key)
    })
  }

  _proxy(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get: function() {
        return this._data[key]
      },
      set: function(val) {
        this._options.data[key] = val
      }
    })
  }
}

//module.exports.V =  V
