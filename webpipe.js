//     Webpipe.js 0.1.2
//     (c) 2012 Dozier Hudson
//     Webpipe.js is freely distributable under the MIT license.
//     Portions of Webpipe.js are inspired or borrowed from Underscore.
//     For all details and documentation:
//     http://www.webpipejs.org/

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
	webpipe.VERSION = '0.1.2';

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
	
	// Inspired by: http://code.google.com/edu/ajax/tutorials/ajax-tutorial.html
	// Options should be a dict with url, method, data, + callback function
	me.ajax = function(options) {
		var ajaxObj;
		var queryString = "";
		
		if (typeof options !== "object") {
			return false;
		}
		
		// Ensure the required properties are set
		if (   !options.hasOwnProperty('url') 
			|| !options.hasOwnProperty('method') 
			|| !options.hasOwnProperty('callback')) {
			return false;
		}
		
		// Ensure the callback is a function
		if (typeof options.callback === "function") {
			return false;
		}
		
		// Compose the query string.
		if (options.data && Object.keys(options.data).length) {
			queryString = me.makeQueryString(options.data);
		}
		
		if (root.XMLHttpRequest) {
			ajaxObj = new root.XMLHttpRequest();
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
			ajaxObj.setRequestHeader('X-Requested-With',
			 							'Webpipe.js/' + webpipe.VERSION);
			
			if (options.method === "POST") {
				ajaxObj.setRequestHeader("Content-Type",
				 						"application/x-www-form-urlencoded");
			}
			
			if (queryString.length) {
				ajaxObj.send(queryString);
			} else {
				ajaxObj.send(null);
			}
		} else if (root.ActiveXObject) {
			ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
			
			if (ajaxObj) {
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
				ajaxObj.setRequestHeader('X-Requested-With',
				 							'Webpipe.js/' + webpipe.VERSION);
				
				if (options.method === "POST") {
					ajaxObj.setRequestHeader("Content-Type",
										"application/x-www-form-urlencoded");
				}
				
				if (queryString.length) {
					ajaxObj.send(queryString);
				} else {
					ajaxObj.send();
				}
			}
		} else {
			options.callback("Environment does not support XMLHttpRequest", {});
		}
	}

	// Construct a query string from an Object
	me.makeQueryString = function(obj) {
		var queryString = "";
		
		for (key in obj) {
		    queryString += key + '=' + obj[key] + '&';
		}
		
		return queryString.slice(0, queryString.length - 1); 
	}

	// The OOP Wrapper
	// ---------------
	
	var wrapper = function(obj) { this._wrapped = obj; };

	// Expose `wrapper.prototype` as `webpipe.prototype`
	webpipe.prototype = wrapper.prototype;
	
}).call(this);