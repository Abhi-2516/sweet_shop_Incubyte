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

  await request(app).post("/api/auth/register").send({
    email: "admindelete@sweet.com",
    password: "AdminPass123"
  });

  await User.updateOne(
    { email: "admindelete@sweet.com" },
    { role: "admin" }
  );

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "admindelete@sweet.com",
    password: "AdminPass123"
  });

  adminToken = loginRes.body.token;

  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Barfi",
      category: "Dessert",
      price: 25,
      quantity: 20
    });

  sweetId = sweetRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Delete Sweet API", () => {
  it("should allow admin to delete a sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet deleted");
  });
});
