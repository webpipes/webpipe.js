# webpipe.js can be used on the server, as a command-line interface, or 
# directly in the browser. The `webpipe` object is automagically added to your 
# environment. No need for `new` or any other sort of initialization.

# Establish the root object, `window` in the browser, or `global` on the server.
webpipe = exports ? (this.webpipe = {})

# Read the Block Definition for a given WebPipe.
webpipe.options = (url, callback) ->
  return _request 'OPTIONS', url, null, (err, meta) ->
    if err
      callback err, meta
    else 
      if not meta.url
        meta.url = url
      
      if meta.url is not url
        console.warn 'URLs do not match: %s  %s', url, meta.url
      
      callback null, meta 

# Execute a WebPipe with optional provided arguments. 
webpipe.execute = (url, inputs, callback) ->
  _request 'POST', url, { 'inputs': [inputs] }, callback

# Private function utilized by `options` and `execute`
_request = (method, url, body, callback) ->
  req = _xhr()
  req.open method, url, true 
  req.onreadystatechange = () ->
    if req.readyState is 4
      if req.status is 200
        try 
          object = JSON.parse req.responseText
        catch err
          return callback err, null

        return callback null, object
      else
        callback({
          code: req.status,
          message: req.statusText
        }, null)
  if body
    req.send JSON.stringify body
  else
    req.send null

# Private function for initializing a `XMLHttpRequest` object.
_xhr = () ->
  if ActiveXObject?
    req = new ActiveXObject('Microsoft.XMLHTTP')
  else if XMLHttpRequest?
    req = new XMLHttpRequest()
  else if require?
    req = new (require('xmlhttprequest').XMLHttpRequest)
