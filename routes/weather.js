const express = require("express");
const axios = require("axios");
const AppDataSource = require("../data-source");
const Weather = require("../entity/Weather");

const router = express.Router();
const weatherRepository = AppDataSource.getRepository(Weather);

// POST /weather - Fetch and save weather data
router.post("/weather", async (req, res) => {
  const { cityName, country } = req.body;
  console.log(cityName);
  const apiKey = process.env.API_KEY;
  
  try {
    const response = await axios.get(
     `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );

    const data = response.data;

    const weather = {
      cityName,
      country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      fetchedAt: new Date(),
    };
    const savedWeather = await weatherRepository.save(weather);
    res.status(200).json(savedWeather);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data", content : error });
  }
});

// GET /weather - Retrieve all weather records
router.get("/weather", async (req, res) => {
  try {
    const weatherRecords = await weatherRepository.find();
    res.json(weatherRecords);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve weather data" });
  }
});

// GET /weather/:id - Retrieve a specific record
router.get("/weather/:id", async (req, res) => {
  try {
    console.log(req.params);
    const weather = await weatherRepository.findOneBy({ id: req.params.id });
    if (!weather) {
      return res.status(404).json({ error: "Weather record not found" });
    }
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve weather data", content : error });
  }
});

// DELETE /weather/:id - Delete a weather record
router.delete("/weather/:id", async (req, res) => {
  try {
    const result = await weatherRepository.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ error: "Weather record not found" });
    }
    res.json({ message: "Weather record deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete weather data" });
  }
});

// GET /ping - Check server response
router.get("/ping", async (req, res) => {
    return res.status(200).json('pong');    
});

module.exports = router;
