import { Query } from "type-graphql";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class PostResolver {
  @Query(() => [User])
  async getUsers() {
    const users = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .getMany();
    return users;
  }

  @Query(() => [Post])
  async getPosts() {
    const posts = await AppDataSource.getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "user")
      .getMany();
    return posts;
  }
}
