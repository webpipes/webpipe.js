// webpipe.js can be used on the server, as a command-line interface, or
// directly in the browser. The `webpipe` object is auto-magically added to your
// environment. No need for `new` or any other sort of initialization.

// Establish the root object, `window` in the browser, or `global` on the

const IS_SERVER = typeof window === 'undefined'
// this.fetch = IS_SERVER ? require('node-fetch') : window.fetch

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
  fetch(url, {
    method: 'options',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => check(res))
    .then(json => callback(null, json))
    .catch(err => error(err.message || err))
}
const webpipe = {
  options: options
}
export default webpipe
