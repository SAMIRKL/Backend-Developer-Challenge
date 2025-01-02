const express = require("express");
const WeatherController = require("../controllers/WeatherController");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Weather management API
 */

/**
 * @swagger
 * /api/weather:
 *   post:
 *     summary: Fetch and save weather data
 *     tags: [Weather]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *                 example: Paris
 *               country:
 *                 type: string
 *                 example: FR
 *     responses:
 *       201:
 *         description: Weather data saved successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to fetch weather data
 */

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Retrieve all weather records
 *     tags: [Weather]
 *     responses:
 *       200:
 *         description: List of weather records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   cityName:
 *                     type: string
 *                   country:
 *                     type: string
 *                   temperature:
 *                     type: number
 *                   description:
 *                     type: string
 */

/**
 * @swagger
 * /api/weather/{id}:
 *   get:
 *     summary: Retrieve a specific weather record
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weather record details
 *       404:
 *         description: Weather record not found
 */

/**
 * @swagger
 * /api/weather/latest/{cityName}:
 *   get:
 *     summary: Retrieve the latest weather data for a specific city
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: cityName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Latest weather data
 *       404:
 *         description: No weather data found
 */

/**
 * @swagger
 * /api/weather/{id}:
 *   put:
 *     summary: Update a specific weather record
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *               country:
 *                 type: string
 *               temperature:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Weather record updated
 *       404:
 *         description: Weather record not found
 */

/**
 * @swagger
 * /api/weather/{id}:
 *   delete:
 *     summary: Delete a specific weather record
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weather record deleted
 *       404:
 *         description: Weather record not found
 */

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Check server response
 *     tags: [Weather]
 *     responses:
 *       200:
 *         description: Server response successful
 */


// POST /weather - Fetch and save weather data
router.post("/weather", WeatherController.createWeather);

// GET /weather - Retrieve all weather records
router.get("/weather", WeatherController.getAllWeather);

// GET /weather/:id - Retrieve a specific weather record
router.get("/weather/:id", WeatherController.getWeatherById);

// GET /weather/latest/:cityName - Retrieve the latest weather data for a specific city
router.get("/weather/latest/:cityName", WeatherController.getLatestWeatherByCity);


// PUT /weather/:id - Update a specific weather record
router.put("/weather/:id", WeatherController.updateWeatherById);

// DELETE /weather/:id - Delete a weather record
router.delete("/weather/:id", WeatherController.deleteWeatherById);

// ANY /ping - Check server response
router.all("/ping", WeatherController.ping);

module.exports = router;