//     Webpipe.js 0.2.0
//     (c) 2012 Matthew Hudson
//     Webpipe.js is freely distributable under the MIT license.
//     Portions of Webpipe.js are inspired or borrowed from Underscore.
//     For all details and documentation:
//     http://www.matthewghudson.com/projects/webpipe.js/

(function () {

	// Baseline setup
	// --------------

	// Establish the root object, `window` in the browser, or `global` on the server.
	var root = this;

	// Establish a 'private' object.
	var me = {};

	// Create a safe reference to the Webpipe object for use below.
	var webpipe = function (obj) { return new wrapper(obj); };

	// Export the Webpipe object for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `webpipe` as a global object via a string identifier,
	// for Closure Compiler "advanced" mode.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = webpipe;
			root.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		}
		exports.webpipe = webpipe;
	} else {
		root['webpipe'] = webpipe;
	}

	// Current version.
	webpipe.VERSION = '0.2.0';

	webpipe.REGISTRY = 'http://registry.webpipes.org/';
	webpipe.DISPATCH = 'http://dispatch.webpipes.org/';

	// Main Functions
	// -----------------

	webpipe.manual = function(webpipeName, callback) {
		var url = webpipe.REGISTRY +"webpipes/"+ webpipeName;

		me.ajax({
			url: url,
			method: "GET",
			callback: callback
		});
	};

	webpipe.request = function(webpipeName, data, callback) {
		var url = webpipe.DISPATCH + webpipeName;

		me.ajax({
			url: url,
			method: "POST",
			data: data,
			callback: callback
		});
	};

	// Private Utility 
	// ---------------

	// Options should be a dict with url, method, data, + callback function
	me.ajax = function(options) {
		var ajaxObj;
		var queryString = '';

		if (typeof options !== 'object') {
			return false;
		}

		// Ensure the required properties are set
		if (   !options.hasOwnProperty('url') 
			|| !options.hasOwnProperty('method') 
			|| !options.hasOwnProperty('callback')) {
			return false;
		}

		// Ensure the callback is a function
		if (typeof options.callback !== 'function') {
			return false;
		}

		// Compose the query string.
		if (options.data && Object.keys(options.data).length) {
			for (key in options.data) {
			    queryString += key + '=' + options.data[key] + '&';
			}
			queryString = queryString.slice(0, queryString.length - 1);
		}

		// Initialize the AJAX object.
		if (root.XMLHttpRequest) {
			ajaxObj = new root.XMLHttpRequest();
		} else if (root.ActiveXObject) {
			ajaxObj = new ActiveXObject('Microsoft.XMLHTTP');		
		} else {
			options.callback('Environment does not support XMLHttpRequest', {});
			return;
		}

		// Set the AJAX request state callback
		ajaxObj.onreadystatechange = function() {
		     if (this.readyState === 4) {
		        if (this.status === 200) {
					options.callback(false, this.responseText);
		        } else {
		            options.callback(true, this.responseText);
		        }
		    }
		}

		ajaxObj.open(options.method, options.url, true);

		// User-Agent header is illegal, but X-Requested-With is available
		ajaxObj.setRequestHeader('X-Requested-With',
		 							'Webpipe.js/' + webpipe.VERSION);

		// If this is POST, add the appropriate HTTP header
		if (options.method === 'POST') {
			ajaxObj.setRequestHeader('Content-Type',
			 						'application/x-www-form-urlencoded');
		}

		// Send the request
		if (queryString.length) {
			ajaxObj.send(queryString);
		} else if (root.XMLHttpRequest){
			ajaxObj.send(null);
		} else {
			ajaxObj.send();
		}
	};

	// The OOP Wrapper
	// ---------------

	var wrapper = function(obj) { this._wrapped = obj; };

	// Expose `wrapper.prototype` as `webpipe.prototype`
	webpipe.prototype = wrapper.prototype;

}).call(this);