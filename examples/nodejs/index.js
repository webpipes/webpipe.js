const webpipe = require('../../')

const url = 'https://webpip.es/calculate-square-root'

webpipe.options(url, function (err, block) {
  if (err) {
    console.error(err)
  } else {
    // Prints the outputs of the WebPipe.
    console.log(block)
  }
})

webpipe.execute(url, { radicand: 9 }, function (err, outputs) {
  if (err) {
    console.error(err)
  } else {
    console.log(outputs)
  }
})
