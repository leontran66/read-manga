const request = require('supertest')
const app = require('../app')

describe('test user registration', () => {
  test("empty fields should return 400 error", async (done) => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: '',
        password: '',
        confirmPW: ''
      })

    expect(res.statusCode).toBe(400)
    expect(res.body.errors).toBeDefined()
    done()
  })
})