const express = require("express");
const request = require("request-promise");

const app = express();

const PORT = process.env.PORT || 5000;

// const apiKey = "d4c2f7fba0c30cc8ff79a3f239c54afd";

const generateScrapperApiKey = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome api");
});

// GEt PRoduct Details

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { apikey } = req.query;

  try {
    const response = await request(
      `${generateScrapperApiKey(
        apiKey
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get Products Reviews Details

app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { apikey } = req.query;

  try {
    const response = await request(
      `${generateScrapperApiKey(
        apiKey
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { apikey } = req.query;

  try {
    const response = await request(
      `${generateScrapperApiKey(
        apiKey
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Products Search Results

app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { apikey } = req.query;

  try {
    const response = await request(
      `${generateScrapperApiKey(
        apiKey
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
