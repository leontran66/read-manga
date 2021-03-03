const request = require('supertest')
const app = require('../app')

let user = {
  email: '',
  password: '',
  confirmPW: ''
}

describe('test user registration', () => {
  describe('input validation', () => {
    test("all empty fields should return 400 error", async (done) => {

      const res = await request(app)
        .post('/api/users')
        .send(user)
  
      expect(res.statusCode).toBe(400)
      expect(res.body.errors).toBeDefined()
      done()
    })
    
    test("one empty should return 400 error", async (done) => {
      user.password = 'testing'

      const res = await request(app)
        .post('/api/users')
        .send(user)
  
      expect(res.statusCode).toBe(400)
      expect(res.body.errors).toBeDefined()
      done()
    })
  
    test("incorrect email should return 400 error", async (done) => {
      user.password = 'testing'
      user.confirmPW = 'testing'

      const res = await request(app)
        .post('/api/users')
        .send(user)
  
      expect(res.statusCode).toBe(400)
      expect(res.body.errors).toBeDefined()
      done()
    })
    
    test("short password should return 400 error", async (done) => {
      user.email = 'email@gmail.com'
      user.password = 'testi'

      const res = await request(app)
        .post('/api/users')
        .send(user)
  
      expect(res.statusCode).toBe(400)
      expect(res.body.errors).toBeDefined()
      done()
    })
  })

  test('existing user should return 400 error', async (done) => {
    user.email = 'email@gmail.com'
    user.password = 'testing'
    user.confirmPW = 'testing'

    await request(app)
      .post('/api/users')
      .send(user)

    const res = await request(app)
      .post('/api/users')
      .send(user)

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBeDefined()
    done()
  })

  test("password mismatch should return 400 error", async (done) => {
    user.email = 'email@gmail.com'
    user.password = 'testing'
    user.confirmPW = 'testin'

    const res = await request(app)
      .post('/api/users')
      .send(user)

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBeDefined()
    done()
  })
  
  /* test("correct input should create user", async (done) => {
    user.email = 'email@gmail.com'
    user.password = 'testing'
    user.confirmPW = 'testing'

    const res = await request(app)
      .post('/api/users')
      .send(user)

    expect(res.statusCode).toBe(200)
    expect(res.body.error).not().toBeDefined()
    done()
  }) */
})