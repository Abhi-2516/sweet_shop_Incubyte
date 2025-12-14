require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../src/config/db");
const User = require("../src/models/User");

let adminToken;

beforeAll(async () => {
  await connectDB();

  // Register admin properly
  await request(app).post("/api/auth/register").send({
    email: "admin@sweet.com",
    password: "AdminPass123"
  });

  // Manually update role to admin
  await User.updateOne(
    { email: "admin@sweet.com" },
    { role: "admin" }
  );

  // Login admin
  const loginRes = await request(app).post("/api/auth/login").send({
    email: "admin@sweet.com",
    password: "AdminPass123"
  });

  adminToken = loginRes.body.token;
});


afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Create Sweet API", () => {
  it("should allow admin to add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Dessert",
        price: 20,
        quantity: 100
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Gulab Jamun");
  });
});
