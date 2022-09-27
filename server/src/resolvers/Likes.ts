import { AppDataSource } from "../data-source";
import { isAuthed } from "../decorators";
import { Likes, LikeType } from "../entity/Likes";
import { Post } from "../entity/Post";
import { Comment } from "../entity/Comment";
import { VoteInputType } from "../inputs";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import {
  calculateTotalCommentVotes,
  calculateTotalPostVotes,
  sendUpVoteNotification,
} from "../utils/core";

@Resolver(Likes)
export class LikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async setVote(
    @Arg("input") input: VoteInputType,
    @Ctx() { user }: MyContext
  ) {
    const validVotes = [-1, 0, 1];
    if (!validVotes.includes(input.vote)) {
      throw Error("Invlaid vote");
    }
    if (input.type === "post") {
      const post: any = await AppDataSource.manager.findOne(Post, {
        where: { postId: input.entityId },
      });
      if (!post) {
        throw Error("Invalid input");
      }
      const likes = await AppDataSource.manager.findOne(Likes, {
        where: { user: { id: user.id }, post: { id: post.id } },
      });
      if (!likes) {
        const likeObj = AppDataSource.manager.create(Likes, {
          post: post,
          user: user,
          likeType: LikeType.POST,
          value: input.vote,
        });
        await AppDataSource.manager.save(likeObj);
        if (input.vote == 1 && user.id != post.user.id) {
          sendUpVoteNotification(user, post, post.postId);
        }

        await calculateTotalPostVotes(post, user);
      } else {
        console.log("Vote", input.vote);
        await AppDataSource.manager.getRepository(Likes).update(likes.id, {
          value: input.vote,
        });
        console.log(input.vote == 1, "||", likes.value);
        if (input.vote == 1 && user.id != post.user.id) {
          console.log("check");
          sendUpVoteNotification(user, post, post.postId);
        }

        await calculateTotalPostVotes(post, user);
      }
    } else {
      const comment: any = await AppDataSource.manager.findOne(Comment, {
        where: { commentId: input.entityId },
      });
      if (!comment) {
        throw Error("Invalid input");
      }
      const likes = await AppDataSource.manager.findOne(Likes, {
        where: { user: { id: user.id }, comment: { id: comment.id } },
      });
      if (!likes) {
        const likeObj = AppDataSource.manager.create(Likes, {
          comment: comment,
          user: user,
          likeType: LikeType.COMMENT,
          value: input.vote,
        });
        await AppDataSource.manager.save(likeObj);
        await calculateTotalCommentVotes(comment, user);
      } else {
        await AppDataSource.manager.getRepository(Likes).update(likes.id, {
          value: input.vote,
        });
        await calculateTotalCommentVotes(comment, user);
      }
    }
    return true;
  }
}
