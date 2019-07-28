// webpipe.js can be used on the server, as a command-line interface, or
// directly in the browser. The `webpipe` object is auto-magically added to your
// environment. No need for `new` or any other sort of initialization.

// Establish the root object, `window` in the browser, or `global` on the
const isServer = typeof window === 'undefined'
const request = isServer ? require('node-fetch') : window.fetch

function error(msg) {
  return new Error(msg)
}

function throwFunc(err) {
  throw err
}

function check(res) {
  if (res.status !== 200) error(res.status, res.statusText, res.url)
  return res.json()
}

function _req(url, opts = { method: 'options' }, fn) {
  fetch(url, opts)
    .then(res => check(res))
    .then(json => fn(json))
    .catch(err => error(err.message || err))
}

const webpipe = {
  // Read the Block Definition for a given WebPipe.
  _req: (url, callback) =>
    _fetch(url, null, (er, meta) => {
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
  export function error(msg) {
    return new Error(msg)
  }

  export function throwFunc(err) {
    throw err
  }

  const isServer = typeof window === 'undefined'
  const _fetch = isServer ? require('node-fetch') : window.fetch

  function check(res) {
    if (res.status !== 200) error(res.status, res.statusText, res.url)
    return res.json()
  }

  function get(url, opts = {}, fn) {
    fetch(url, opts)
      .then(res => check(res))
      .then(json => fn(json))
      .catch(err => error(err.message || err))
  }
  const request = _fetch()
  req.open(method, url, true)
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      const req = _xhr()
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

/*
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
}).then(function(response) {
  response.status     //=> number 100–599
  response.statusText //=> String
  response.headers    //=> Headers
  response.url        //=> String

  return response.text()
}, function(error) {
  error.message //=> String
})
*/
export default webpipe
