import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { isAuthed } from "../decorators";
import { PaginationInputType, PostInputType } from "../inputs";
import { AppDataSource } from "../data-source";
import { paginator } from "../utils/paginator";
import { MyContext, PostsPaginatedResponse, VoteType } from "../types";
import { Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { Likes } from "../entity/Likes";

export class PostResolver {
  @Query(() => [User])
  async getUsers() {
    const users = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .getMany();
    return users;
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuthed)
  async addPost(
    @Arg("input") input: PostInputType,
    @Ctx() { user }: MyContext
  ) {
    console.log(user, "User DATA");
    const post = AppDataSource.manager.create(Post, {
      cover: input.cover,
      content: input.content,
      user,
    });
    await AppDataSource.manager.save(post);
    return post;
  }

  @Query(() => Post)
  async getPost(@Arg("post") post: string): Promise<Post | null> {
    const postResult = await AppDataSource.manager.findOne(Post, {
      where: { postId: post },
    });
    console.log("Likes", postResult?.likes);
    return postResult;
  }

  @Query(() => VoteType)
  @UseMiddleware(isAuthed)
  async getPostVote(
    @Arg("post") post: string,
    @Ctx() { user }: MyContext
  ): Promise<VoteType> {
    const like = await AppDataSource.manager.findOne(Likes, {
      where: { post: { postId: post }, user: { id: user.id } },
    });
    if (!like) {
      return { vote: 0, voted: false };
    }
    return { vote: like.value, voted: like.value != 0 };
  }

  @Query(() => PostsPaginatedResponse)
  async getPosts(
    @Arg("input") pagination: PaginationInputType
  ): Promise<PostsPaginatedResponse> {
    const posts = await AppDataSource.getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "user")
      .orderBy("posts.createdAt", "DESC")
      .getMany();

    let paginResponse = paginator(posts, pagination.page, pagination.pageSize);
    return paginResponse;
  }
}
