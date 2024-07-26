const express = require("express");
const router = express.Router();

router.get("/:query", (req, res) => {
  const query = req.params.query;
  console.log(query)
  res.send({
    data: "Stock data",
    query: query,
  });
});

module.exports = router;
