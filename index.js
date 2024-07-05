//index.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const ticketsModel = require("./model/ticketsSchema");
const connectToDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Fetch data and add

const fetchData = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data).slice(0, 10);

    await ticketsModel.deleteMany({}); // Clear existing data

    tickers.forEach(async (ticker) => {
      const tickerData = new ticketsModel({
        base_unit: ticker.base_unit,
        last: ticker.last,
        volume: ticker.volume,
        sell: ticker.sell,
        buy: ticker.buy,
        name: ticker.name,
      });
      await tickerData.save();
    });
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

fetchData();

// 2. Route for fetching data

app.get("/tickers", async (request, response) => {
  const allTickers = await ticketsModel.find({});
  response.status(200).json({
    data: allTickers,
    success: true,
  });
});

const PORT = process.env.PORT || 8000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
});
