import { AppDataSource } from "../data-source";
import { Likes } from "../entity/Likes";
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import { Comment } from "../entity/Comment";

export const calculateTotalPostVotes = async (post: Post, user: User) => {
  let total = 0;
  const likes = await AppDataSource.manager.find(Likes, {
    where: {
      post: {
        id: post.id,
      },
    },
  });
  console.log(likes.length);
  likes.forEach((l) => {
    total += l.value;
  });
  // update total likes count
  console.log("Total: ", total);
  await AppDataSource.manager
    .getRepository(Post)
    .update(post.id, { likes: total });
  return total;
};

export const calculateTotalCommentVotes = async (
  comment: Comment,
  user: User
) => {
  let total = 0;
  const likes = await AppDataSource.manager.find(Likes, {
    where: {
      comment: {
        id: comment.id,
      },
    },
  });
  likes.forEach((l) => {
    total += l.value;
  });
  // update total likes count
  await AppDataSource.manager
    .getRepository(Comment)
    .update(comment.id, { likes: total });
  console.log("Total: ", total);
  return total;
};
