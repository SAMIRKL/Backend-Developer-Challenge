const express = require("express");
const dotenv = require("dotenv");
const { connectRedis } = require("./utils/redisClient");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swaggerConfig");
const WeatherRoutes =  require("./interface/routes/weatherRoutes");
const AppDataSource = require("./infrastructure/database/config");

dotenv.config();
const app = express();

(async () => {
  await connectRedis();
})();

app.use(express.json());
app.use("/api", WeatherRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(function(req, res) {
  res.status(404);

  if (req.accepts('json')) {
    res.json({ status: 'fail', 'message': 'Not Found' });
    return;
  }
});

const startServer = async () => {
  try {
    
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on  http://127.0.0.1:${process.env.PORT || 3000}`);
      console.log(`Swagger Docs available at http://localhost:${process.env.PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();
