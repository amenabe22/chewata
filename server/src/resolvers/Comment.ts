import { CommentInput } from "../inputs";
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
import { MyContext, VoteType } from "../types";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Likes } from "../entity/Likes";

@Resolver(Comment)
export class CommentResolver {
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
      throw Error("Invalid input");
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
      user: user,
      isReply: input.isReply,
      reply_to: replyTarget,
    });
    await AppDataSource.manager.save(comment);
    return comment;
  }

  @Query(() => [Comment])
  async getPostComments(@Arg("post") post: string) {
    const comments = AppDataSource.manager.find(Comment, {
      where: {
        post: { postId: post },
      },
      order: {
        createdAt: "DESC",
      },
    });
    return comments;
  }
}
