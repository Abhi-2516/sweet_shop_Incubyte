require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../src/config/db");
const User = require("../src/models/User");

let token;
let sweetId;

beforeAll(async () => {
  await connectDB();

  // Admin setup
  await request(app).post("/api/auth/register").send({
    email: "adminpurchase@sweet.com",
    password: "AdminPass123"
  });

  await User.updateOne(
    { email: "adminpurchase@sweet.com" },
    { role: "admin" }
  );

  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "adminpurchase@sweet.com",
    password: "AdminPass123"
  });

  const adminToken = adminLogin.body.token;

  // Create sweet
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Peda",
      category: "Dessert",
      price: 12,
      quantity: 10
    });

  sweetId = sweetRes.body._id;

  // Normal user
  await request(app).post("/api/auth/register").send({
    email: "userpurchase@sweet.com",
    password: "UserPass123"
  });

  const userLogin = await request(app).post("/api/auth/login").send({
    email: "userpurchase@sweet.com",
    password: "UserPass123"
  });

  token = userLogin.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Purchase Sweet API", () => {
  it("should allow user to purchase sweet and reduce quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(7);
  });
});
