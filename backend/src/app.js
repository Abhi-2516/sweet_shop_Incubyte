const express = require("express");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const sweetRoutes = require("./routes/sweetRoutes");


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);


app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({ message: "Protected content" });
});

module.exports = app;
