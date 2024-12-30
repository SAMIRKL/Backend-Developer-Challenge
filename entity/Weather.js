const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Weather",
  tableName: "weather",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    cityName: {
      type: "varchar",
      nullable: false,
    },
    country: {
      type: "varchar",
      nullable: false,
    },
    temperature: {
      type: "float",
      nullable: false,
    },
    description: {
      type: "varchar",
      nullable: false,
    },
    humidity: {
      type: "int",
      nullable: false,
    },
    windSpeed: {
      type: "float",
      nullable: false,
    },
    fetchedAt: {
      type: "timestamp",
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});
