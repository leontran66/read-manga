const request = require('supertest');
const app = require('../app');

describe('test the users route', () => {
  test("should response the post method", async () => {
    const res = await request(app).post("/api/users");
    expect(res.statusCode).toBe(200);
  });
});