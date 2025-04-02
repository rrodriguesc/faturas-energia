import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserConsumption } from "./entity/userConsumption";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [UserConsumption],
});
