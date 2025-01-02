const Joi = require("joi");

const createWeatherValidator = Joi.object({
  cityName: Joi.string().trim().required().messages({
    "string.empty": "City name is required.",
    "any.required": "City name is required."
  }),
  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required.",
    "any.required": "Country is required."
  }),
});

module.exports = createWeatherValidator;
