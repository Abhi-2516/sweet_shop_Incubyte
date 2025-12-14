require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../src/config/db");

let token;

beforeAll(async () => {
  await connectDB();

  await request(app).post("/api/auth/register").send({
    email: "protected@example.com",
    password: "Password123"
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "protected@example.com",
    password: "Password123"
  });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Protected Route Access", () => {
  it("should block access without token", async () => {
    const res = await request(app).get("/api/protected");
    expect(res.statusCode).toBe(401);
  });

  it("should allow access with valid token", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Protected content");
  });
});
