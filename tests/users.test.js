const request = require('supertest')
const app = require('../src/app')

describe('Test the user route', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/api/users')
    expect(response.statusCode).toBe(200)
  })
})