# [webpipe.js](https://github.com/webpipes/webpipe.js)

Javascript library for working with WebPipes. Use with Node.js or in the browser.

[![Build Status](https://travis-ci.org/webpipes/webpipe.js.png?branch=master)](https://travis-ci.org/webpipes/webpipe.js)

## Installation

Just include the script. The `webpipe` object is automagically added to your environment. No need for `new` or any other sort of initialization. 

### Browser

``` html
<script src="webpipe.js"></script>
```

As a courtesy, webpipejs.org offers a compressed and CDN-hosted version:

 ``` html
<script src="http://cdn.webpipejs.org/latest.min.js"></script>
```

Or, use a specific version by replacing <code>x.x.x</code>:

 ``` html
<script src="http://cdn.webpipejs.org/x.x.x/webpipe.min.js"></script>
```

### Node

Or, if you're using webpipe.js with node.js
``` sh
$ npm [-g] install webpipe
```

Then require the "webpipe" module:

``` javascript
var webpipe = require("webpipe");
```

## Usage

webpipe.js exposes two methods: `webpipe.execute()` and `webpipe.options()`. Use `webpipe.options()` to load a WebPipe's Block Definition. It can be handy while debugging and/or learning about new WebPipes. See [examples/](https://github.com/webpipes/webpipe.js/blob/master/examples/) for usage examples.

### webpipe.execute(url, inputs, callback)

The real workhorse is `webpipe.execute()`. Use it to make a request to your WebPipe of choice.

``` javascript
var url = "http://block-parse-markdown.herokuapp.com/";
var inputs = { markdown: "*hello world*" };
webpipe.execute(url, inputs, function (err, data) {
  if (err) return console.warn("Error: ", err);

  // Prints the response of the Parse Markdown webpipe.
  console.log(data);
});
``` 

## Command-line Usage 

You can also use webpipe.js from the command-line. To use this feature make sure you install webpipe.js globally. 
``` sh
$ webpipe http://block-parse-markdown.herokuapp.com/ --markdown "*hello world*"
```

Store an alias (in ~/.webpipe) so you don't have to type the URL every time:
``` sh
$ webpipe alias markdown http://block-parse-markdown.herokuapp.com/
```

Prefix a value with `@` to read from a file, or `-` for STDIN:
``` sh
$ webpipe markdown --markdown @README.md
$ cat README.md | ./webpipe markdown --markdown @-
```

## More Examples

See [examples/browser/index.html](https://github.com/webpipes/webpipe.js/blob/master/examples/browser/index.html) and [examples/nodejs/index.js](https://github.com/webpipes/webpipe.js/blob/master/examples/nodejs/index.js) for more examples of usage.

## Suggestions

All comments in how to improve this library are very welcome. Feel free post suggestions to the Issue tracker, or even better, fork the repository to implement your own ideas and submit a pull request.

## License

Unless attributed otherwise, everything is under the MIT License (see LICENSE for more info).
