const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');

beforeAll(async () => {
  jest.setTimeout(10000)
  const url = `mongodb://127.0.0.1/`;
  await mongoose.connect(url, { useNewUrlParser: true });
  jest.setTimeout(5000)
});

it("Can fetch fuelstorage", async () => {
    const res = await request.get("/api/fuelstorage/");
    expect(res.status).toBe(200);
  });