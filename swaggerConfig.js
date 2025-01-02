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
        url: "http://127.0.0.1:3000/api", // آدرس سرور خود را تنظیم کنید
      },
    ],
  },
  apis: ["./src/interface/routes/*.js"], // مسیر فایل‌هایی که حاوی داکیومنت Swagger هستند
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
