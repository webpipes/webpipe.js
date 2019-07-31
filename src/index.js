// webpipe.js can be used on the server, or directly in the browser.
// The `webpipe` object is auto-magically added to your
// environment. No need for `new` or any other sort of initialization.

// Establish the root object, `window` in the browser,
// or `global` on the server
const IS_SERVER = typeof window === 'undefined'
const _fetch = IS_SERVER ? require('node-fetch') : window.fetch

const check = res => {
  if (res.status !== 200) {
    error(res.status, res.statusText, res.url)
  }
  return res.json()
}

const error = err => {
  console.error(err)
  throw new Error(err)
}

// Retrieves the Block Definition for a given WebPipe.
const options = (url, callback) => {
  _fetch(url, {
    method: 'options',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => check(res))
    .then(json => callback(null, json))
    .catch(err => error(err.message || err))
}

// Executes the a call w/ argument(s) to a given WebPipe.
const execute = (url, inputs, callback) => {
  _fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: [inputs] })
  })
    .then(res => check(res))
    .then(json => callback(null, json))
    .catch(err => error(err.message || err))
}

const webpipe = {
  options: options,
  execute: execute
}

export default webpipe
