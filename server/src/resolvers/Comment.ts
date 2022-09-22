import { CommentInput, PaginationInputType } from "../inputs";
import { Comment } from "../entity/Comment";
import { AppDataSource } from "../data-source";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuthed } from "../decorators";
import { CommentsPaginatedType, MyContext, VoteType } from "../types";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Likes } from "../entity/Likes";
import { paginator } from "../utils/paginator";

@Resolver(Comment)
export class CommentResolver {
  @Query(() => CommentsPaginatedType)
  @UseMiddleware(isAuthed)
  async userPublicComments(
    @Arg("pagination") pagination: PaginationInputType,
    @Arg("user") uid: string
  ) {
    console.log(uid);
    const comments = await AppDataSource.manager.find(Comment, {
      where: { user: { userId: uid } },
      order: { createdAt: "DESC" },
    });
    console.log(comments, "COMS");
    let paginResponse = paginator(
      comments,
      pagination.page,
      pagination.pageSize
    );
    return paginResponse;
  }

  @Query(() => CommentsPaginatedType)
  @UseMiddleware(isAuthed)
  async userComments(
    @Arg("pagination") pagination: PaginationInputType,
    @Ctx() { user }: MyContext
  ) {
    const comments = await AppDataSource.manager.find(Comment, {
      where: { user: { id: user.id } },
      order: { createdAt: "DESC" },
    });
    let paginResponse = paginator(
      comments,
      pagination.page,
      pagination.pageSize
    );
    return paginResponse;
  }
  @Query(() => VoteType)
  @UseMiddleware(isAuthed)
  async getCommentVote(
    @Arg("comment") comment: string,
    @Ctx() { user }: MyContext
  ): Promise<VoteType> {
    const like = await AppDataSource.manager.findOne(Likes, {
      where: { comment: { commentId: comment }, user: { id: user.id } },
    });
    if (!like) {
      return { vote: 0, voted: false };
    }
    return { vote: like.value, voted: like.value != 0 };
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuthed)
  async addComment(
    @Arg("input") input: CommentInput,
    @Ctx() { user }: MyContext
  ) {
    let replyTarget: any;
    const post: any = await AppDataSource.manager.findOne(Post, {
      where: { postId: input.post },
    });
    if (!post) {
      throw Error("post not found");
    }
    if (input.isReply) {
      const target = await AppDataSource.manager.findOne(User, {
        where: { userId: input.replyTo },
      });
      if (!target) {
        // reply target not found
        throw Error("Invalid input");
      }
      replyTarget = target;
    }
    console.log(post, "TF");
    const comment = AppDataSource.manager.create(Comment, {
      cover: input.cover,
      message: input.message,
      post: post,
      isReply: input.isReply,
      reply_to: replyTarget,
      user,
    });
    await AppDataSource.manager.save(comment);
    return comment;
  }

  @Query(() => CommentsPaginatedType)
  async getPostComments(
    @Arg("post") post: string,
    @Arg("pagination") pagination: PaginationInputType
  ): Promise<CommentsPaginatedType> {
    const comments = await AppDataSource.manager.find(Comment, {
      where: {
        post: { postId: post },
      },
      order: {
        createdAt: "DESC",
      },
    });
    const paginatedResponse = paginator(
      comments,
      pagination.page,
      pagination.pageSize
    );
    return paginatedResponse;
  }
}
