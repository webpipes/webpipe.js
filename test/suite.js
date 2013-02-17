var vows = require('vows');
var http = require('http');
var assert = require('assert');
var webpipe = require('../');

var endpoint = "http://block-parse-markdown.herokuapp.com/";

function isBlockDefinitionResponseFormat() {
  return function (err, data) {
    assert.equal(data.hasOwnProperty('outputs'), true);
    assert.equal(data.hasOwnProperty('inputs'), true);
    assert.equal(data.hasOwnProperty('name'), true);
    assert.equal(data.hasOwnProperty('description'), true);
  }
}

function isBlockOutputResponseFormat() {
  return function (err, data) {
    assert.equal(data.hasOwnProperty('outputs'), true);
  }
}

function containsExpectedBlockOutputData(expected) {
  return function (err, data) {
    assert.equal(data.outputs[0].hasOwnProperty(expected), true);
  }
}

vows.describe('webpipe.options()')
  .addBatch({
    'View Markdown WebPipe Block Definition': {
      topic: function () {
        var next = this.callback;
        webpipe.options(endpoint, function (err, data) {
          next(err, data);
        });
      },
      'should respond with a Block Definition': isBlockDefinitionResponseFormat()
    }
  })
  .export(module);

vows.describe('webpipe.execute()')
  .addBatch({
    'Call Markdown WebPipe Block': {
      topic: function () {
        var next = this.callback;
        webpipe.execute(endpoint, {
          markdown: "*hello world*"
        }, function (err, data) {
          next(err, data);
        });
      },
      'should respond with Block Output': isBlockOutputResponseFormat(),
      'should respond with expected Outputs key': containsExpectedBlockOutputData('html')
    }
  })
  .export(module);