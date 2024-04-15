import React, { useState } from "react";
import axios from "axios"; // For making HTTP requests
import "../styles/styles.css"; // Adjust the path as needed

export function Home() {
  const [ticker, setTicker] = useState("");
  const [news, setNews] = useState([]);
  console.log("koko");
  const api = process.env.REACT_APP_API;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${ticker}&searchIn=title&pageSize=10&apiKey=${api}`
      );
      setNews(response.data.articles.slice(0, 10)); // Assuming the API returns news articles in the "articles" field
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="home-div">
      <form onSubmit={handleSubmit}>
        <label>
          Enter Stock Ticker:
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      <ul>
        {news.map((article, index) => (
          <React.Fragment key={index}>
            <li>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url}>Read More</a>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
