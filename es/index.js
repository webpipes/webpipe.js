// webpipe.js can be used on the server, as a command-line interface, or
// directly in the browser. The `webpipe` object is auto-magically added to your
// environment. No need for `new` or any other sort of initialization.

// Establish the root object, `window` in the browser, or `global` on the

var IS_SERVER = typeof window === 'undefined';
// this.fetch = IS_SERVER ? require('node-fetch') : window.fetch

var check = function check(res) {
  if (res.status !== 200) {
    error(res.status, res.statusText, res.url);
  }
  return res.json();
};

var error = function error(err) {
  console.error(err);
  throw new Error(err);
};

// Retrieves the Block Definition for a given WebPipe.
var options = function options(url, callback) {
  fetch(url, {
    method: 'options',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return check(res);
  }).then(function (json) {
    return callback(null, json);
  }).catch(function (err) {
    return error(err.message || err);
  });
};
var webpipe = {
  options: options
};
export default webpipe;