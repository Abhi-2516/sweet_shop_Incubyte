require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../src/config/db");

beforeAll(async () => {
  await connectDB();

  // Create a user first
  await request(app).post("/api/auth/register").send({
    email: "loginuser@example.com",
    password: "Password123"
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Auth Login API", () => {
  it("should login an existing user and return a token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "loginuser@example.com",
        password: "Password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
