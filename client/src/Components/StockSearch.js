import React, { useState, useEffect } from "react";

const StockSearch = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [buyOrderStatus, setBuyOrderStatus] = useState(""); // New state variable
  const [balance, setBalance] = useState(0); // Initialize balance to 0

  useEffect(() => {
    // Fetch the initial balance from the database
    fetch(`http://localhost:5000/stock/balance`)
      .then((response) => response.json())
      .then((data) => setBalance(data.balance));
  }, []);

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:5000/stock/search/${stockSymbol}`
    );
    const data = await response.json();
    setStockData(data);
  };

  const handleBuy = async () => {
    const response = await fetch(`http://localhost:5000/stock/buy/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        stockId: stockSymbol,
        amount: 10,
        price: "100.0",
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      // Assuming the API returns a success flag
      setBuyOrderStatus("Buy order placed successfully!"); // Update the status
    } else {
      setBuyOrderStatus("Error placing buy order"); // Update the status
    }
  };

  const handleSell = async () => {
    const response = await fetch("http://localhost:5000/stock/sell/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        stockId: stockSymbol,
        amount: 10,
        price: "100.0",
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      // Assuming the API returns a success flag
      // Fetch the updated balance from the database
      fetch(`http://localhost:5000/stock/balance`)
        .then((response) => response.json())
        .then((data) => setBalance(data.balance));
    }
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
          {buyOrderStatus && ( // Display the status message
            <p>{buyOrderStatus}</p>
          )}
          <p>Current Balance: {balance}</p> // Display the current balance
        </div>
      )}
    </div>
  );
};

export default StockSearch;
