const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const { restClient } = require("@polygon.io/client-js");
require("dotenv").config();
const rest = restClient("n_SMEdWeAOF30LiLCCLsfxLiqwTHIFCc");

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
      console.log(rows)
      rest.stocks
        .previousClose(rows[0].symbol)
        .then((data) => {
          //console.log(data.results[0].c);
          res.json({
            symbol: rows[0].symbol,
            name: rows[0].name,
            price: data.results[0].c, // assuming this is the price from the rest.stocks.previousClose call
          });
        })
        .catch((e) => {
          console.log(e);
        });
      
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
    // Check user's balance
    const [user] = await pool.execute(
      "SELECT balance FROM users WHERE id = ?",
      [userId]
    );
    if (user[0].balance < amount * price) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Update balance
    await pool.execute("UPDATE users SET balance = balance - ? WHERE id = ?", [
      amount * price,
      userId,
    ]);

    // Get stock ID from stock symbol
    const [stock] = await pool.execute(
      "SELECT id FROM stocks WHERE symbol = ?",
      [stockId]
    );
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    // Record trade
    await pool.execute(
      "INSERT INTO trades (user_id, stock_id, amount, price, action) VALUES (?, ?, ?, ?, 'buy')",
      [userId, stock[0].id, amount, price]
    );

    // Update user's stock quantity
    console.log("hi", stock[0].id);
    const [userStock] = await pool.execute(
      "SELECT * FROM user_stocks WHERE user_id = ? AND stock_id = ?",
      [userId, stock[0].id]
    );
    console.log(userStock);
    if (userStock.length > 0) {
      // User already owns this stock, update quantity
      await pool.execute(
        "UPDATE user_stocks SET quantity = quantity + ? WHERE user_id = ? AND stock_id = ?",
        [amount, userId, stock[0].id]
      );
    } else {
      // User doesn't own this stock, insert new record
      console.log("ko");
      await pool.execute(
        "INSERT INTO user_stocks (user_id, stock_id, quantity) VALUES (?, ?, ?)",
        [userId, stock[0].id, amount]
      );
    }

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
    // Get stock ID from stock symbol
    const [stock] = await pool.execute(
      "SELECT id FROM stocks WHERE symbol = ?",
      [stockId]
    );
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    // Check user's quantity in user_stocks

    const [userStock] = await pool.execute(
      "SELECT quantity FROM user_stocks WHERE user_id = ? AND stock_id = ?",
      [userId, stock[0].id]
    );

    if (!userStock || userStock[0].quantity - amount < 0) {
      return res.status(403).json({ error: "Insufficient quantity" });
    }

    // Record trade
    await pool.execute(
      "INSERT INTO trades (user_id, stock_id, amount, price, action) VALUES (?, ?, ?, ?, 'sell')",
      [userId, stock[0].id, amount, price]
    );

    // Update user's quantity in user_stocks
    await pool.execute(
      "UPDATE user_stocks SET quantity = quantity - ? WHERE user_id = ? AND stock_id = ?",
      [amount, userId, stock[0].id]
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
// Get user's balance
router.get("/balance", async (req, res) => {
  const { userId } = req.body;
  try {
    const [user] = await pool.execute("SELECT balance FROM users WHERE id = 1");
    if (user.length > 0) {
      res.json({ balance: user[0].balance });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).send("Error fetching balance");
  }
});

// Get user's holdings
router.get("/holdings/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [holdings] = await pool.execute(`
      SELECT 
        stock_id, 
        quantity
      FROM 
        user_stocks
      WHERE 
        user_id = ? AND quantity > 0
    `, [userId]);
      console.log(holdings)
    if (holdings.length > 0) {
      const stockIds = holdings.map(holding => holding.stock_id);
      console.log(stockIds)
      const [stocks] = await pool.execute(
        `
        SELECT 
          id, 
          symbol, 
          name
        FROM 
          stocks
        WHERE 
          id IN (${stockIds.join(",")})
      `,
        [stockIds]
      );
      console.log(stocks);
      const holdingsWithStockInfo = holdings.map(holding => {
        const stock = stocks.find(stock => stock.id === holding.stock_id);
        return {
          stock_id: holding.stock_id,
          quantity: holding.quantity,
          symbol: stock.symbol,
          name: stock.name
        };
      });

      res.json(holdingsWithStockInfo);
    } else {
      res.status(404).json({ error: "No holdings found" });
    }
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).send("Error fetching holdings");
  }
});
module.exports = router;
