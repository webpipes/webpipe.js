# [WEBPIPE.JS](http://www.matthewghudson.com/projects/webpipe.js/)

Javascript library for Webpipes. Use with Node.js or in the browser.

## Installation

Just include the script. The webpipe object is automagically added to your environment. No need for `new` or any other sort of initialization. As a courtesy, webpipejs.org offers a compressed and CDN hosted version for your ease. In the browser do the following (you can also use HTTPS):

``` html
<script src="http://cdn.webpipejs.org/latest.min.js"></script>
``` 

or 

``` html
<script src="http://cdn.webpipejs.org/{VERSION}/webpipe.min.js"></script>
```

or if you're using webpipe.js with node.js

	$ npm -g install webpipe 

## Usage

Webpipe.js exposes two methods: `webpipe.request()` and `webpipe.manual()`. If you'd like to see more examples [read my tutorial](http://www.matthewghudson.com/projects/webpipe.js/).

### webpipe.manual(webpipeName, callback)

The `webpipe.manual()` pings registry.webpipes.org and returns the webpipe.json  configuration file. It's handy while debugging and/or learning about new webpipes.

``` javascript
webpipe.manual('proxy', function (er, data) {
	if (er) {
		console.log("Error: "  + er);
	} else {
		// Prints the webpipe.json config for the proxy webpipe.
		console.log(data);
	}
});
``` 

### webpipe.request(webpipeName, data, callback)

The real workhorse is `webpipe.request()`. You can use it to make a request to your webpipe of choice.

``` javascript
var url = "https://raw.github.com/matthewhudson/dotfiles/master/README.md";
webpipe.request('proxy', { method: "GET", url : url }, function (er, data) {
	if (er) {
		console.log("Error: "  + er);
	} else {
		// Prints the raw markdown content.
		console.log(data);
	}
});
``` 

## Command-line Usage 

You can also use webpipe.js from the command-line. To use this feature make sure you install webpipe.js globally. 

### Manual

	$ webpipe --name proxy --manual
	
### Request

	$ webpipe --name proxy --request --url http://www.google.com/ --method GET

## More Examples

See [./examples/browser/index.html](https://github.com/matthewhudson/webpipe.js/blob/master/examples/browser/index.html) and [./examples/nodejs/index.js](https://github.com/matthewhudson/webpipe.js/blob/master/examples/nodejs/index.js) for more examples of usage. If you'd like to see even more examples [read my tutorial](http://www.matthewghudson.com/projects/webpipe.js/) to see Webpipe.js in action.

## Suggestions

All comments in how to improve this library are very welcome. Feel free post suggestions to the Issue tracker, or even better, fork the repository to implement your own ideas and submit a pull request.

## License

Unless attributed otherwise, everything is under the MIT License (see LICENSE for more info).