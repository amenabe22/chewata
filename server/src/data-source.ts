import "dotenv/config";
import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Notifications } from "./entity/Notification";
import { Comment } from "./entity/Comment";
import { Likes } from "./entity/Likes";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USER,
  password: process.env.DB_PASS as any,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Post, Comment, Likes, Notifications],
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
