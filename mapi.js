const { restClient } = require("@polygon.io/client-js");
require("dotenv").config();
const rest = restClient(process.env.POLYGON_API_KEY);

// rest.stocks
//   .aggregates("AAPL", 1, "day", "2023-01-01", "2023-01-14")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.error("An error happened:", e);
//   });

  rest.stocks.previousClose("AAPL")
  .then((data)=>{
    console.log(data.results[0].c);
  })
  .catch((e)=>{
    console.log(e);
  })