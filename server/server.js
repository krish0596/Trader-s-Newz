const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000; // or any other port number
const articles = require("./src/routes/articles.js");
const stockRoute = require("./src/routes/stock.js");
app.use(express.json());
app.use(cors());
app.use("/", articles);
app.use("/stock", stockRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
