webpipe = exports ? (this.webpipe = {})

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

webpipe.execute = (url, inputs, callback) ->
  _request 'POST', url, { 'inputs': [inputs] }, callback

_request = (method, url, body, callback) ->
  req = _xhr();
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
        }, null);
  if body
    req.send JSON.stringify body
  else
    req.send null

_xhr = () ->
  if ActiveXObject?
    req = new ActiveXObject('Microsoft.XMLHTTP')
  else if XMLHttpRequest?
    req = new XMLHttpRequest()
  else if require?
    req = new (require('xmlhttprequest').XMLHttpRequest)
