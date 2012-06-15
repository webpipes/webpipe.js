# WEBPIPE.JS

Javascript library for Webpipes. Use with Node.js or in the browser.

## Installation

Just include the script. The webpipe object is automagically added to your environment. No need for `new` or any other sort of initialization. As a courtesy, webpipejs.org offers a CDN hosted version for speedy inclusion. In the browser do the following (you can also use HTTPS):

``` html
<script src="http://cdn.webpipejs.org/0.1.0/webpipe.min.js"></script>
``` 
or if you're using webpipe.js with node.js

	$ npm -g install webpipe 

## Usage

Webpipe.js exposes two methods: `webpipe.request()` and `webpipe.manual()`. If you'd like to see more examples [read my tutorial](http://www.dozierhudson.com/projects/webpipe.js/).

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
var url = "https://raw.github.com/duzour/dotfiles/master/README.md";
webpipe.request('proxy', { method: "GET", url : url }, function (er, data) {
	if (er) {
		console.log("Error: "  + er);
	} else {
		// Prints the raw markdown content.
		console.log(data);
	}
});
``` 

## License

Unless attributed otherwise, everything is under the MIT License (see LICENSE for more info).