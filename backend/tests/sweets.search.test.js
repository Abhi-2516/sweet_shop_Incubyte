require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../src/config/db");
const User = require("../src/models/User");

let token;

beforeAll(async () => {
  await connectDB();

  // Register admin
  await request(app).post("/api/auth/register").send({
    email: "adminsearch@sweet.com",
    password: "AdminPass123"
  });

  // Promote to admin
  await User.updateOne(
    { email: "adminsearch@sweet.com" },
    { role: "admin" }
  );

  // Login admin
  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "adminsearch@sweet.com",
    password: "AdminPass123"
  });

  const adminToken = adminLogin.body.token;

  // Create sweet as admin
  await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Rasgulla",
      category: "Dessert",
      price: 15,
      quantity: 50
    });

  // Register normal user
  await request(app).post("/api/auth/register").send({
    email: "search@sweet.com",
    password: "SearchPass123"
  });

  // Login normal user
  const userLogin = await request(app).post("/api/auth/login").send({
    email: "search@sweet.com",
    password: "SearchPass123"
  });

  token = userLogin.body.token;
});


afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Search Sweets API", () => {
  it("should search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Rasgulla")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
