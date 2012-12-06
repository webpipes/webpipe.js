(function(exports) {

exports.VERSION = "0.4.0";

exports.options = function(url, callback) {
    return exports.request("OPTIONS", url, null, function (err, meta) {
        if (err) {
            callback(err, meta);
        } else {
            if (!meta.url) {
                meta.url = url;
            }
            if (meta.url !== url) {
                console.warn("URLs don't match: " + url + " " + meta.url);
            }
            callback(null, meta);
        }
    });
}

exports.execute = function(url, inputs, callback) {
    return exports.request("POST", url, { inputs: [inputs] }, callback);
}

exports.request = function(method, url, body, callback) {
    var req = newXHR();
    req.open(method, url, true);
    // req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                try {
                    object = JSON.parse(req.responseText);
                } catch (err) {
                    return callback(err, null);
                }
                return callback(null, object);
            } else {
                callback({ code: req.status, message: req.statusText }, null);
            }
        }
    }
    if (body) {
        req.send(JSON.stringify(body));
    } else {
        req.send(null);
    }
}

function newXHR() {
    if (typeof ActiveXObject !== "undefined") {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (typeof XMLHttpRequest !== "undefined") {
        return new XMLHttpRequest();
    } else if (typeof require !== "undefined") {
        return new (require("xmlhttprequest").XMLHttpRequest);
    }
}

})(typeof exports !== "undefined" ? exports : (webpipe = {}));
