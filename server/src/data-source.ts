import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "chewata",
  synchronize: true,
  logging: false,
  entities: [User, Post],
  subscribers: [],
  migrations: [],
});

export const initDb = () => {
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
    })
    .catch((error) => console.log(error));
};
