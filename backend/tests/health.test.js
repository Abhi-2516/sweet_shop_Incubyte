const request = require("supertest");
const app = require("../src/app");

describe("Health Check API", () => {
  it("should return status OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});
