import React, { useState } from "react";

const StockSearch = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState(null);

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:5000/stock/search/${stockSymbol}`
    );
    const data = await response.json();
    setStockData(data);
  };

  const handleBuy = async () => {
    const response = await fetch(
      `http://localhost:5000/stock/buy/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId: 1,stockId: stockSymbol,amount: 10,price: "100.0",}),
      }
    );
    const result = await response.json();
    console.log(result);
  };

  const handleSell = async () => {
    const response = await fetch("/api/sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockSymbol, amount: 10 }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <input
        type="text"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value)}
        placeholder="Enter stock symbol"
      />
      <button onClick={handleSearch}>Search</button>
      {stockData && (
        <div>
          <p>Symbol: {stockData.symbol}</p>
          <p>Name: {stockData.name}</p>
          <p>Price: {stockData.price}</p>
          <button onClick={handleBuy}>Buy</button>
          <button onClick={handleSell}>Sell</button>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
