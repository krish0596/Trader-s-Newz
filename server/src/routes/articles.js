const express = require("express");
const router = express.Router();
const fetchArticles = require("../models/fetcharticles.js"); // Ensure this path is correct

// Example route for fetching articles
router.get("/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const articles = await fetchArticles(query);
    res.json(articles);
  } catch (error) {
    res.status(500).send("Error fetching articles");
  }
});

module.exports = router;
