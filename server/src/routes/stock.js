const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Create a connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "stock_analysis_react_router",
});

// Search stock by symbol
router.get("/search/:symbol", async (req, res) => {
  const { symbol } = req.params;
  //console.log(`Searching for symbol: ${symbol}`);
  try {
    const [rows] = await pool.execute("SELECT * FROM stocks WHERE symbol = ?", [
      symbol,
    ]);
    //console.log(rows);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Stock not found" });
    }
  } catch (error) {
    console.error("Error searching for stock:", error);
    res.status(500).send("Error searching for stock");
  }
});

// Buy stock
router.post("/buy", async (req, res) => {
  const { userId, stockId, amount, price } = req.body;
  try {
    //Check user's balance
    const [user] = await pool.execute(
      "SELECT balance FROM users WHERE id = ?",
      [userId]
    );
    if (user.balance < amount * price) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    //Update balance
    await pool.execute("UPDATE users SET balance = balance - ? WHERE id = ?", [
      amount * price,
      userId,
    ]);

    // Record trade
    await pool.execute(
      "INSERT INTO trades (user_id, stock_id, amount, price, action) VALUES (?, ?, ?, ?, 'buy')",
      [userId, stockId, amount, price]
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(404).send("Error buying stock");
  }
});

// Sell stock
router.post("/sell", async (req, res) => {
  const { userId, stockId, amount, price } = req.body;
  try {
    // Record trade
    await pool.execute(
      "INSERT INTO trades (user_id, stock_id, amount, price, action) VALUES (?, ?, ?, ?, 'sell')",
      [userId, stockId, amount, price]
    );

    // Update balance
    await pool.execute("UPDATE users SET balance = balance + ? WHERE id = ?", [
      amount * price,
      userId,
    ]);

    res.json({ success: true });
  } catch (error) {
    res.status(404).send("Error selling stock");
  }
});

module.exports = router;
