const { DataSource } = require("typeorm");
const Weather = require("../../domain/entities/Weather");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "AbrNoc",
  password: "",
  entities: [Weather],
  synchronize: true,
  logging: false,
});

module.exports = AppDataSource;
