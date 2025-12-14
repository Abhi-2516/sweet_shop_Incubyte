const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require("../services/sweetService");

const addSweet = async (req, res) => {
  try {
    const sweet = await createSweet(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSweets = async (req, res) => {
  try {
    const sweets = await getAllSweets();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const search = async (req, res) => {
  try {
    const sweets = await searchSweets(req.query);
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const sweet = await updateSweet(req.params.id, req.body);
    res.status(200).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await deleteSweet(req.params.id);
    res.status(200).json({ message: "Sweet deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const purchase = async (req, res) => {
  try {
    const sweet = await purchaseSweet(
      req.params.id,
      Number(req.body.quantity)
    );
    res.status(200).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const restock = async (req, res) => {
  try {
    const sweet = await restockSweet(
      req.params.id,
      Number(req.body.quantity)
    );
    res.status(200).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addSweet,
  getSweets,
  search,
  update,
  remove,
  purchase,
  restock
};
