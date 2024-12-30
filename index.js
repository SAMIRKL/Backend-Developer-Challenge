const express = require("express");
const dotenv = require("dotenv");
const AppDataSource = require("./data-source");
const router = require("./routes/weather");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Database connection error"));
