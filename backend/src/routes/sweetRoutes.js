const express = require("express");
const {
  addSweet,
  getSweets,
  search,
  update,
  remove,
  purchase,
  restock
} = require("../controllers/sweetController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, isAdmin, addSweet);
router.get("/", protect, getSweets);
router.get("/search", protect, search);
router.put("/:id", protect, isAdmin, update);
router.delete("/:id", protect, isAdmin, remove);
router.post("/:id/purchase", protect, purchase);
router.post("/:id/restock", protect, isAdmin, restock);

module.exports = router;
