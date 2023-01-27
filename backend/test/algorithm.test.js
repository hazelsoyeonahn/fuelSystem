const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

it("Algorithm should train", async () => {
    const res = await request.get("/api/algorithm/train");
    expect(res.status).toBe(200);
  });
  
it("Algorithm should validate", async () => {
    const res = await request.get("/api/algorithm/validate");
    expect(res.status).toBe(200);
})

it("Algorithm should predict", async () => {
    const res = await request.get("/api/algorithm/predict");
    expect(res.status).toBe(200);
})


