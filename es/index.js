// webpipe.js can be used on the server, or directly in the browser.
// The `webpipe` object is auto-magically added to your
// environment. No need for `new` or any other sort of initialization.

// Establish the root object, `window` in the browser,
// or `global` on the server
var IS_SERVER = typeof window === 'undefined';
var _fetch = IS_SERVER ? require('node-fetch') : window.fetch;

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
  _fetch(url, {
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

// Executes the a call w/ argument(s) to a given WebPipe.
var execute = function execute(url, inputs, callback) {
  _fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: [inputs] })
  }).then(function (res) {
    return check(res);
  }).then(function (json) {
    return callback(null, json);
  }).catch(function (err) {
    return error(err.message || err);
  });
};

var webpipe = {
  options: options,
  execute: execute
};

export default webpipe;