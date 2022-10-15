import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { isAuthed } from "../decorators";
import { PaginationInputType, PostInputType } from "../inputs";
import { AppDataSource } from "../data-source";
import { paginator } from "../utils/paginator";
import { MyContext, PostsPaginatedResponse, VoteType } from "../types";
import { Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { Comment } from "../entity/Comment";
import { Likes } from "../entity/Likes";
import { Tag } from "../entity/Core";
import { Community } from "../entity/Community";
import { slugifyTitle } from "../utils/core";

export class PostResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async deletePost(@Arg("post") post: string, @Ctx() { user }: MyContext) {
    const postObj = await AppDataSource.manager.find(Post, {
      where: { postId: post, user: { id: user.id } },
    });
    if (!postObj.length) {
      throw Error("post not found");
    }
    await AppDataSource.manager.delete(Post, postObj[0]?.id);
    return true;
  }

  @Query(() => [User])
  async getUsers() {
    const users = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .getMany();
    return users;
  }

  @Query(() => PostsPaginatedResponse)
  async communityPosts(
    @Arg("title") title: string,
    @Arg("pagination") pagination: PaginationInputType
  ) {
    const community = await AppDataSource.manager.find(Community, {
      where: {
        slug: slugifyTitle(title.toLowerCase()),
      },
    });
    if (!community.length) {
      throw Error("Invalid Request");
    }
    const posts = await AppDataSource.manager.find(Post, {
      where: { community: { id: community[0].id } },
      order: { createdAt: "DESC" },
      relations: ["community"],
    });
    let paginResponse = paginator(posts, pagination.page, pagination.pageSize);
    return paginResponse;
  }

  @Query(() => PostsPaginatedResponse)
  @UseMiddleware(isAuthed)
  async userPublicPosts(
    @Arg("pagination") pagination: PaginationInputType,
    @Arg("user") uid: string
  ) {
    const posts = await AppDataSource.manager.find(Post, {
      where: { user: { userId: uid } },
      order: { createdAt: "DESC" },
    });
    let paginResponse = paginator(posts, pagination.page, pagination.pageSize);
    return paginResponse;
  }

  @Query(() => [Tag])
  async topTags() {
    const topTags = await AppDataSource.manager.find(Tag);
    return topTags.slice(0, 20);
  }

  @Query(() => PostsPaginatedResponse)
  @UseMiddleware(isAuthed)
  async userPosts(
    @Arg("pagination") pagination: PaginationInputType,
    @Ctx() { user }: MyContext
  ) {
    const posts = await AppDataSource.manager.find(Post, {
      where: { user: { id: user.id } },
      order: { createdAt: "DESC" },
    });
    let paginResponse = paginator(posts, pagination.page, pagination.pageSize);
    return paginResponse;
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuthed)
  async addPost(
    @Arg("input") input: PostInputType,
    @Ctx() { user }: MyContext
  ) {
    const community = await AppDataSource.manager.find(Community, {
      where: {
        communityId: input.community,
      },
    });
    if (!community.length) {
      throw Error("Invalid request");
    }
    const post = AppDataSource.manager.create(Post, {
      cover: input.cover,
      content: input.content,
      community: community[0],
      user,
    });
    await AppDataSource.manager.save(post);
    if (input.tags) {
      input.tags.forEach(async (tag) => {
        await AppDataSource.manager.save(Tag, {
          tagName: tag,
          post,
        });
      });
    }

    const newPost = await AppDataSource.manager
      .createQueryBuilder(Post, "post")
      .leftJoinAndSelect("post.tags", "tags")
      .leftJoinAndSelect("post.user", "user")
      .where("post.id = :id", { id: post.id })
      .getOne();
    return { ...newPost, comments: this.commentsCount(post) };
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
  async commentsCount(e: Post): Promise<number> {
    const posts = await AppDataSource.manager.count(Comment, {
      where: { post: { id: e.id } },
    });
    return posts;
  }
  @Query(() => PostsPaginatedResponse)
  async tagPostFilter(
    @Arg("input") pagination: PaginationInputType,
    @Arg("tag", { nullable: true }) tag: string
  ): Promise<PostsPaginatedResponse> {
    const posts = await AppDataSource.getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "user")
      .leftJoinAndSelect("posts.tags", "tag")
      .where("tag.tagName = :tag", { tag })
      .getMany();

    const all_posts = posts.map(async (e: any) => {
      return { ...e, comments: await this.commentsCount(e) };
    });
    let paginResponse = paginator(
      all_posts,
      pagination.page,
      pagination.pageSize
    );
    return paginResponse;
  }

  @Query(() => PostsPaginatedResponse)
  async getPosts(
    @Arg("input") pagination: PaginationInputType,
    @Arg("filter", { nullable: true }) filter: String
  ): Promise<PostsPaginatedResponse> {
    let posts: any;
    if (!filter) {
      posts = await AppDataSource.getRepository(Post)
        .createQueryBuilder("posts")
        .leftJoinAndSelect("posts.user", "user")
        .leftJoinAndSelect("posts.tags", "tags")
        .leftJoinAndSelect("posts.community", "community")
        .orderBy("posts.createdAt", "DESC")
        .orderBy("user.createdAt", "DESC")
        .getMany();
    } else if (filter === "recent") {
      posts = await AppDataSource.getRepository(Post)
        .createQueryBuilder("posts")
        .leftJoinAndSelect("posts.user", "user")
        .leftJoinAndSelect("posts.tags", "tags")
        .leftJoinAndSelect("posts.community", "community")
        .orderBy("posts.createdAt", "DESC")
        .getMany();
    } else if (filter === "top") {
      posts = await AppDataSource.getRepository(Post)
        .createQueryBuilder("posts")
        .leftJoinAndSelect("posts.user", "user")
        .leftJoinAndSelect("posts.tags", "tags")
        .leftJoinAndSelect("posts.community", "community")
        .orderBy("posts.likes", "DESC")
        .getMany();
    }
    const all_posts = posts.map(async (e: any) => {
      return { ...e, comments: await this.commentsCount(e) };
    });
    let paginResponse = paginator(
      all_posts,
      pagination.page,
      pagination.pageSize
    );
    return paginResponse;
  }
}
