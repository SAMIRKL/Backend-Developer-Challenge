const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    info: {
      title: "Weather API",
      version: "1.0.0",
      description: "API documentation for Weather Service",
    },
    servers: [
      {
        url: "http://127.0.0.1:3000/api",
      },
    ],
  },
  apis: ["./src/interface/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
