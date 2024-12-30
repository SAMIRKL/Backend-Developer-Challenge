const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [require("./entity/Weather")],
  synchronize: true,
  logging: false,
});

module.exports = AppDataSource;
