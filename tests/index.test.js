import expect from 'expect'
import nock from 'nock'
import webpipe from 'src/index'

const endpoint = {
  host: 'https://demo.wetalky.com',
  pathname: '/blocks/calculate-square-root',
  response: {
    options: require('./response.options.mock.json'),
    post: require('./response.options.mock.json')
  }
}

describe('Block Definition', () => {
  it('should return a json body', () => {
    nock(endpoint.host)
      .options(endpoint.pathname)
      .reply(200, endpoint.response.options)

    webpipe.options().then(res => expect(res).to.be.an('object'))
  })
})

/*

beforeEach(function () {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      resolve({
        ok: true,
        Id: '123',
        json: function () {
          return { Id: '123' }
        }
      })
    })

    return p
  })
})

it('ack', async function () {
  const response = await Api.ack('foo', 'bar')
  console.log(response)
  expect(response.Id).toBe(1)
})
*/
