const axios = require("axios");
const WeatherRepository = require("../../infrastructure/repositories/WeatherRepository");
const createWeatherValidator = require("../../domain/validators/weather/createWeatherValidator");
const updateWeatherValidator = require("../../domain/validators/weather/updateWeatherValidator");
const { redisClient } = require("../../utils/redisClient");
class WeatherController {

  // Fetch and save weather data
  async createWeather(req, res) {
    const { cityName, country } = req.body;
    const apiKey = process.env.API_KEY;
    const cacheKey = `weather:${country}:${cityName}`;

    try {

      const cachedWeather = await redisClient.get(cacheKey);
      if (cachedWeather) {
        return res.status(200).json({
          status: "success",
          data: JSON.parse(cachedWeather),
          message: "Weather data saved successfully.",
        });
      }

      const { error } = createWeatherValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "fail",
          message: error.details[0].message,
        });
      }

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=5&appid=${apiKey}`
      );

      const forecasts = response.data.list;
      const results = [];
      for (const forecast of forecasts) {
        const forecastDate = forecast.dt_txt.split(" ")[0];
        const existingRecord = await WeatherRepository.repository.findOne({
          where : {
            cityName,
            forecastDate,
          }
        });
        
        if (existingRecord && !existingRecord.shouldUpdate) {
          results.push(existingRecord);
          continue;
        }

        const weatherData = {
          cityName,
          country,
          temperature: forecast.main.temp,
          description: forecast.weather[0].description,
          humidity: forecast.main.humidity,
          windSpeed: forecast.wind.speed,
          forecastDate,
          fetchedAt: new Date(),
          ...(existingRecord ? { id: existingRecord.id } : {})
        };
        
        const savedWeather = await WeatherRepository.save(weatherData);
        results.push(savedWeather);

      }

      await redisClient.set(cacheKey, JSON.stringify(results), { EX: 3600 });


      res.status(201).json({
        status: "success",
        data: results,
        message: "Weather data saved successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to fetch weather data.",
        error: error.message,
      });
    }
  }

  // Retrieve all weather records
  async getAllWeather(req, res) {
    try {
      const weatherRecords = await WeatherRepository.findAll();
      res.status(200).json({
        status: "success",
        data: weatherRecords,
        message: "Weather records retrieved successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve weather data.",
        error: error.message,
      });
    }
  }

  // Retrieve a specific weather record
  async getWeatherById(req, res) {
    try {
      const weather = await WeatherRepository.findOneBy({ id: req.params.id });
      if (!weather) {
        return res.status(404).json({
          status: "fail",
          message: "Weather record not found.",
        });
      }
      res.status(200).json({
        status: "success",
        data: weather,
        message: "Weather record retrieved successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve weather data.",
        error: error.message,
      });
    }
  }

  // Retrieve the latest weather data for a specific city
  async getLatestWeatherByCity(req, res) {
    try {
      const cityName = req.params.cityName;
      const weather = await WeatherRepository.findLatestByCity(cityName);
      if (!weather) {
        return res.status(404).json({
          status: "fail",
          message: "No weather data found for the specified city.",
        });
      }
      res.status(200).json({
        status: "success",
        data: weather,
        message: "Latest weather data retrieved successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve latest weather data.",
        error: error.message,
      });
    }
  }

  // Update a specific weather record
  async updateWeatherById(req, res) {
    try {
      const { error } = updateWeatherValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "fail",
          message: error.details[0].message,
        });
      }

      const existingWeather = await WeatherRepository.findById(req.params.id);
      if (!existingWeather) {
        return res.status(404).json({
          status: "fail",
          message: "Weather record not found.",
        });
      }

      const updatedWeather = await WeatherRepository.save({
        id: req.params.id,
        ...req.body,
      });

      const cacheKey = `weather:${weather.country}:${weather.cityName}`;
      await redisClient.del(cacheKey);

      res.status(200).json({
        status: "success",
        data: updatedWeather,
        message: "Weather record updated successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to update weather data.",
        error: error.message,
      });
    }
  }

  // Delete a weather record
  async deleteWeatherById(req, res) {
    try {
      const result = await WeatherRepository.delete(req.params.id);
      if (result.affected === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Weather record not found.",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Weather record deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to delete weather data.",
        error: error.message,
      });
    }
  }

  // Ping route
  async ping(req, res) {
    res.status(200).json({
      status: "success",
      message: "pong",
    });
  }
}

module.exports = new WeatherController();
