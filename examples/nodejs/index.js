var express = require('express');
var app = express.createServer(express.logger());
var webpipe = require('../../webpipe');
	
app.use(express.bodyParser());

app.get('/', function(request, response) {
	webpipe.manual('proxy', function (er, data) {
		if (er) {
			console.log(er);
			response.send("Error: "  + er);
		} else {
			console.log(data);
			response.send(data);
		}
	});
});

var port = process.env.PORT || 3020;
app.listen(port, function() {
	console.log("Webpipe.js Demo: Listening on " + port);
});
