# [webpipe.js](https://github.com/webpipes/webpipe.js)

Javascript library for working with WebPipes. Use with Node.js or in the
browser.

[![Build
Status](https://api.travis-ci.org/webpipes/webpipe.js.svg?branch=master)](https://travis-ci.org/webpipes/webpipe.js)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/webpipe)](https://bundlephobia.com/result?p=webpipe)

## Installation

Just include the script. The `webpipe` object is automagically added to your
environment. No need for `new` or any other sort of initialization.

### Browser

Automatically include the most recent release:
```html
<script src="https://unpkg.com/webpipe/umd/webpipe.min.js"></script>
```

Or, use a specific version by replacing <code>x.x.x</code>:

```html
<script src="https://unpkg.com/webpipe@1.0.0/umd/webpipe.min.js"></script>
```

### Node

Or, if you're using webpipe.js with node.js

```sh
$ npm i webpipe --save
```

Then require the "webpipe" module:

```javascript
const webpipe = require('webpipe')
```

## Usage

webpipe.js exposes two methods: `webpipe.execute()` and `webpipe.options()`. Use
`webpipe.options()` to load a WebPipe's Block Definition. It can be handy while
debugging and/or learning about new WebPipes. See
[examples/](https://github.com/webpipes/webpipe.js/blob/master/examples/) for
usage examples.

### webpipe.execute(url, inputs, callback)

The real workhorse is `webpipe.execute()`. Use it to make a request to your
WebPipe of choice.

```javascript
const url = 'https://webpip.es/calculate-square-root'
const inputs = { radicand: 9 }

webpipe.execute(url, inputs, (err, outputs) => {
  if (err) {
    throw new Error(err.message)
  }
  console.log(outputs)
})
```

## Suggestions

All comments in how to improve this library are very welcome. Feel free post
suggestions to the Issue tracker, or even better, fork the repository to
implement your own ideas and submit a pull request.

## License

Unless attributed otherwise, everything is under the MIT License (see LICENSE
for more info).
