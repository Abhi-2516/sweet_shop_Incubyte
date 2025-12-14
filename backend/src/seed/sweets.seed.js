const mongoose = require("mongoose");
require("dotenv").config();
const Sweet = require("../models/Sweet");

const sweets = [];

const categories = ["Dessert", "Chocolate", "Candy", "Bakery"];

for (let i = 1; i <= 100; i++) {
  sweets.push({
    name: `Sweet ${i}`,
    category: categories[i % categories.length],
    price: Math.floor(Math.random() * 50) + 10,
    quantity: Math.floor(Math.random() * 20)
  });
}

const seedSweets = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Sweet.deleteMany(); // clean slate (demo purpose)
    await Sweet.insertMany(sweets);
    console.log("✅ Seed data inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedSweets();
