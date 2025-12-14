require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../src/config/db");
const User = require("../src/models/User");

let adminToken;
let sweetId;

beforeAll(async () => {
  await connectDB();

  // Register admin
  await request(app).post("/api/auth/register").send({
    email: "adminupdate@sweet.com",
    password: "AdminPass123"
  });

  await User.updateOne(
    { email: "adminupdate@sweet.com" },
    { role: "admin" }
  );

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "adminupdate@sweet.com",
    password: "AdminPass123"
  });

  adminToken = loginRes.body.token;

  // Create sweet
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Ladoo",
      category: "Dessert",
      price: 10,
      quantity: 40
    });

  sweetId = sweetRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Update Sweet API", () => {
  it("should allow admin to update a sweet", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ price: 15 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(15);
  });
});
