const Joi = require("joi");

const updateWeatherValidator = Joi.object({
  cityName: Joi.string().trim().optional(),
  country: Joi.string().trim().optional(),
  temperature: Joi.number().optional(),
  description: Joi.string().trim().optional(),
  humidity: Joi.number().integer().min(0).max(100).optional().messages({
    "number.min": "Humidity must be at least 0.",
    "number.max": "Humidity cannot exceed 100.",
  }),
  windSpeed: Joi.number().min(0).optional().messages({
    "number.min": "Wind speed must be a non-negative number."
  }),
});

module.exports = updateWeatherValidator;
