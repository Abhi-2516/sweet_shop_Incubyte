require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../src/config/db");
const User = require("../src/models/User");

let token;

beforeAll(async () => {
  await connectDB();

  // register user
  await request(app).post("/api/auth/register").send({
    email: "user@sweet.com",
    password: "UserPass123"
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "user@sweet.com",
    password: "UserPass123"
  });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Get All Sweets API", () => {
  it("should return list of sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
