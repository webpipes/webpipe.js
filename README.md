# [webpipe.js](https://github.com/webpipes/webpipe.js)

Javascript library for working with WebPipes. Use with Node.js or in the browser.

## Installation

Just include the script. The `webpipe` object is automagically added to your environment. No need for `new` or any other sort of initialization. As a courtesy, webpipejs.org offers a compressed and CDN hosted version for your ease (*TODO: update CDN*). In the browser do the following:

``` html
<script src="webpipe.js"></script>
```

or if you're using webpipe.js with node.js

	$ npm -g install webpipe

Then require the "webpipe" module:

``` javascript
var webpipe = require("webpipe");
```

## Usage

webpipe.js exposes two methods: `webpipe.execute()` and `webpipe.help()`. If you'd like to see more examples [read my tutorial](http://www.matthewghudson.com/projects/webpipe.js/).

### webpipe.options(url, callback)

The `webpipe.options()` loads a WebPipe's metadata. It's handy while debugging and/or learning about new webpipes.

``` javascript
webpipe.options('http://block-parse-markdown.herokuapp.com/', function (err, data) {
  if (err) {
    console.log("Error: ", err);
  } else {
    // Prints the webpipe.json config for the Parse Markdown webpipe.
    console.log(data);
  }
});
``` 

### webpipe.execute(url, inputs, callback)

The real workhorse is `webpipe.execute()`. You can use it to make a request to your WebPipe of choice.

``` javascript
webpipe.execute("http://block-parse-markdown.herokuapp.com/", { markdown: "*hello world*" }, function (err, data) {
  if (err) {
    console.log("Error: ", err);
  } else {
    // Prints the outputs of the WebPipe.
    console.log(data);
  }
});
``` 

## Command-line Usage 

You can also use webpipe.js from the command-line. To use this feature make sure you install webpipe.js globally. 

	$ webpipe http://block-parse-markdown.herokuapp.com/ --markdown "*hello world*"

Store an alias (in ~/.webpipe) so you don't have to type the URL every time:

	$ webpipe alias markdown http://block-parse-markdown.herokuapp.com/

Prefix a value with `@` to read from a file, or `-` for STDIN:

	$ webpipe markdown --markdown @README.md
	$ cat README.md | ./webpipe markdown --markdown @-

## More Examples

See [./examples/browser/index.html](https://github.com/matthewhudson/webpipe.js/blob/master/examples/browser/index.html) and [./examples/nodejs/index.js](https://github.com/matthewhudson/webpipe.js/blob/master/examples/nodejs/index.js) for more examples of usage. If you'd like to see even more examples [read my tutorial](http://www.matthewghudson.com/projects/webpipe.js/) to see Webpipe.js in action.

## Suggestions

All comments in how to improve this library are very welcome. Feel free post suggestions to the Issue tracker, or even better, fork the repository to implement your own ideas and submit a pull request.

## License

Unless attributed otherwise, everything is under the MIT License (see LICENSE for more info).
