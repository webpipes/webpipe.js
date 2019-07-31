var webpipe = require('../../')

function optionsDemo (callback) {
  webpipe.options('https://block-parse-markdown.herokuapp.com/', function (
    err,
    data
  ) {
    if (err) {
      console.log('Error: ', err)
    } else {
      // Prints the webpipe.json config for the Parse Markdown webpipe.
      console.log(data)
    }
    callback()
  })
}

function executeDemo (callback) {
  webpipe.execute(
    'http://block-parse-markdown.herokuapp.com/',
    { markdown: '*hello world*' },
    function (err, data) {
      if (err) {
        console.log('Error: ', err)
      } else {
        // Prints the outputs of the WebPipe.
        console.log(data)
      }
      callback()
    }
  )
}

console.log('Running webpipe.options()\n')
optionsDemo(function () {
  console.log('\nRunning webpipe.execute()\n')
  executeDemo(function () {
    console.log('\nDone!')
  })
})
