import React, { useState, useEffect } from "react";

const StockSearch = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [buyOrderStatus, setBuyOrderStatus] = useState("");
  const [sellOrderStatus, setSellOrderStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    fetchBalance();
    fetchHoldings();
  }, []);

  const fetchBalance = () => {
    fetch(`http://localhost:5000/stock/balance`)
      .then((response) => response.json())
      .then((data) => setBalance(data.balance));
  };

 const fetchHoldings = () => {
   fetch(`http://localhost:5000/stock/holdings/1`)
     .then((response) => {
       if (!response.ok) {
        setHoldings([]);
         throw new Error(response.statusText);
       }
       return response.json();
     })
     .then((data) => {
       console.log("Holdings data:", data); // Add this line
       setHoldings(data);
     })
     .catch((error) => console.error("Error fetching holdings:", error));
 };
  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:5000/stock/search/${stockSymbol}`
    );
    const data = await response.json();
    console.log(data);
    setStockData(data);
    fetchHoldings();
  };

  const handleBuy = async () => {
    const response = await fetch(`http://localhost:5000/stock/buy/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        stockId: stockSymbol,
        amount: quantity,
        price: stockData.price,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setBuyOrderStatus("Buy order placed successfully!");
      fetchBalance();
      fetchHoldings();
    } else {
      setBuyOrderStatus("Error placing buy order");
    }
  };

  const handleSell = async () => {
    const response = await fetch("http://localhost:5000/stock/sell/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        stockId: stockSymbol,
        amount: quantity,
        price: stockData.price,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      fetchBalance();
      fetchHoldings();
      setSellOrderStatus("Stock sold successfully");
    } else {
      setSellOrderStatus("error selling stock");
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
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
          <button onClick={handleBuy}>Buy</button>
          <button onClick={handleSell}>Sell</button>
          {buyOrderStatus && <p style={{ color: "green" }}>{buyOrderStatus}</p>}
          {sellOrderStatus && (
            <p style={{ color: "green" }}>{sellOrderStatus}</p>
          )}
          <p>Current Balance: {balance}</p>
          <h2>Holdings:</h2>
          <ul>
            {holdings.map((holding) => (
              <li key={holding.stock_id}>
                {holding.symbol} - {holding.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
