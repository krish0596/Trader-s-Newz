const axios = require("axios");

const fetchArticles = async (query) => {
  try {
    // Ensure you have set the API_KEY in your environment variables
    const apiKey = "e34b8aff60194e49b6a0818871b4889e";
    if (!apiKey) {
      throw new Error("API_KEY not set in environment variables");
    }

    // Construct the API URL
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;

    // Fetch data from the API
    const response = await axios.get(apiUrl);

    // Map the response data to desired structure
    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
    }));
  } catch (error) {
    console.error("Error fetching news:", error.message);
    throw new Error("Error fetching news");
  }
};

module.exports = fetchArticles;
