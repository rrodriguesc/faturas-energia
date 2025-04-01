import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserConsumption } from "./entity/userConsumption";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [UserConsumption],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

export const UserConsumptionRepository =
  AppDataSource.getMongoRepository(UserConsumption);
