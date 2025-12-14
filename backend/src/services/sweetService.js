const Sweet = require("../models/Sweet");

const createSweet = async (data) => Sweet.create(data);
const getAllSweets = async () => Sweet.find();

const searchSweets = async (query) => {
  const filter = {};
  if (query.name) filter.name = { $regex: query.name, $options: "i" };
  if (query.category) filter.category = query.category;

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  return Sweet.find(filter);
};

const updateSweet = async (id, data) =>
  Sweet.findByIdAndUpdate(id, data, { new: true });

const deleteSweet = async (id) => Sweet.findByIdAndDelete(id);

const purchaseSweet = async (id, qty) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");
  if (qty <= 0) throw new Error("Invalid quantity");
  if (sweet.quantity < qty) throw new Error("Insufficient stock");

  sweet.quantity -= qty;
  await sweet.save();
  return sweet;
};

const restockSweet = async (id, qty) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");
  if (qty <= 0) throw new Error("Invalid restock quantity");

  sweet.quantity += qty;
  await sweet.save();
  return sweet;
};

module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};
