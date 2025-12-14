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
    email: "adminrestock@sweet.com",
    password: "AdminPass123"
  });

  await User.updateOne(
    { email: "adminrestock@sweet.com" },
    { role: "admin" }
  );

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "adminrestock@sweet.com",
    password: "AdminPass123"
  });

  adminToken = loginRes.body.token;

  // Create sweet
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Jalebi",
      category: "Dessert",
      price: 18,
      quantity: 5
    });

  sweetId = sweetRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Restock Sweet API", () => {
  it("should allow admin to restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(15);
  });

  it("should reject invalid restock quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: -5 });

    expect(res.statusCode).toBe(400);
  });
});
