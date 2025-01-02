const IWeatherRepository = require("../../domain/interfaces/IWeatherRepository");
const AppDataSource = require("../../infrastructure/database/config");

class WeatherRepository extends IWeatherRepository {
  constructor(dataSource) {
    super();
    this.repository = dataSource.getRepository("Weather");
  }

  async findById(id) {

    return await this.repository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.repository.find();
  }

  async findLatestByCity(cityName) {
    return await this.repository.findOne({
      where: { cityName },
      order: { fetchedAt: "DESC" },
    });
  }

  async save(weather) {
    return await this.repository.save(weather);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

module.exports = new WeatherRepository(AppDataSource);
