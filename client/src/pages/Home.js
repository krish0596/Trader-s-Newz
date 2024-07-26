import React, { useState } from "react";
import axios from "axios";
import "../styles/styles.css";

export function Home() {
  const [ticker, setTicker] = useState("");
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/${ticker}`); // Pass ticker as part of the URL path
      if (response.data && response.data.length > 0) {
        setNews(response.data);
        setError(null);
      } else {
        setError("No articles found.");
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Error fetching news. Please try again.");
      setNews([]);
    }
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="tickerInput">
          Enter Stock :
          <input
            type="text"
            id="tickerInput"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="HDFC"
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url}>Read More</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
