// webpipe.js can be used on the server, as a command-line interface, or
// directly in the browser. The `webpipe` object is automagically added to your
// environment. No need for `new` or any other sort of initialization.

// Establish the root object, `window` in the browser, or `global` on the server.
const webpipe = {
  // Read the Block Definition for a given WebPipe.
  options: (url, callback) =>
    _request('options', url, null, (er, meta) => {
      if (er) {
        return callback(er, meta)
      } else {
        if (!meta.url) {
          meta.url = url
        }

        if (meta.url === !url) {
          console.warn('URLs do not match: %s  %s', url, meta.url)
        }

        callback(null, meta)
      }
    }),

  // Execute a WebPipe with optional provided arguments.
  execute: (url, inputs, callback) =>
    _request('post', url, { inputs: [inputs] }, callback)
}

// Private function utilized by `options` and `execute`
const _request = (method, url, body, callback) => {
  const req = _xhr()
  req.open(method, url, true)
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status === 200) {
        let object
        try {
          object = JSON.parse(req.responseText)
        } catch (er) {
          return callback(er, null)
        }

        callback(null, object)
      } else {
        callback(
          new Error({
            code: req.status,
            message: req.statusText
          })
        )
      }
    }
  }
  if (body) {
    req.send(JSON.stringify(body))
  } else {
    req.send(null)
  }
}

const _isDefined = v => typeof v !== 'undefined'
const _isNotNull = v => v !== null

// Private function for initializing a `XMLHttpRequest` object.
const _xhr = () => {
  let req
  if (_isDefined(ActiveXObject) && _isNotNull(ActiveXObject)) {
    req = new ActiveXObject('Microsoft.XMLHTTP')
  } else if (_isDefined(XMLHttpRequest) && _isNotNull(XMLHttpRequest)) {
    req = new XMLHttpRequest()
  } else if (_isDefined(require) && _isNotNull(require)) {
    req = new (require('xmlhttprequest')).XMLHttpRequest()
  }
  return req
}

export default webpipe
