const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "AbrNoc",
  password: "",
  entities: [require("./entity/Weather")],
  synchronize: true,
  logging: false,
});

module.exports = AppDataSource;
