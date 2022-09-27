import { AppDataSource } from "../data-source";
import { Likes } from "../entity/Likes";
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import { Comment } from "../entity/Comment";
import { coreBullQ } from "../queue";
import axios from "axios";

export const sendPushNotification = async (
  target: string,
  title: string,
  body: string,
  cover: string,
  link: string
) => {
  console.log("Push to " + target);
  const data = {
    data: {
      score: "5x1",
      time: "15:10",
    },
    to: target,
    direct_boot_ok: true,
    notification: {
      title: title,
      image: cover,
      body: body,
      click_action: link,
      icon: cover,
    },
  };
  await axios
    .post("https://fcm.googleapis.com/fcm/send", data, {
      headers: {
        Authorization:
          "key=AAAA36Wz4rs:APA91bGd7X54GMxU_MDY69yMNnkWtJMeQUzxld1GX0UdU-oo4GzZyFXSFp-FA0X261zrDkimXtDCX3AJSG5jmLraYxoakdgDuBIerklk6Ku5_SXQ6t6eT7JDN4B44iKSbY6rch648Ak3",
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((e) => {
      console.log("Error sending push", e);
    });
};

export const sendCommentNotification = (
  user: User,
  comment: Comment,
  post: Post,
  entityId: string
) => {
  const link = `https://chewata.fun/game/${post.postId}`;
  coreBullQ.add("Add", {
    title: "Notification",
    type: "notification",
    user: user,
    target: post.user,
    cover: comment.cover ? comment.cover : post.cover,
    annotation: `${user.fullName} Commented: ${comment.message}`,
    notificationType: "comment",
    data: post.cover,
    link,
    entityId,
  });
};

export const sendCommentUpVoteNotification = (
  user: User,
  comment: Comment,
  entityId: string
) => {
  const annotation = `Your comment got an upvote from ${user.fullName}`;
  const link = `https://chewata.fun/game/${comment.post.postId}`;
  coreBullQ.add("Add", {
    title: "Notification",
    type: "notification",
    user: user,
    target: comment.user,
    cover: comment.cover ? comment.cover : user.photo,
    annotation: annotation,
    notificationType: "comment",
    data: comment.cover ? comment.cover : user.photo,
    link,
    entityId,
  });
};
export const sendUpVoteNotification = (
  user: User,
  post: Post,
  entityId: string
) => {
  const annotation = `You got an upvote from ${user.fullName}`;
  const link = `https://chewata.fun/game/${post.postId}`;
  coreBullQ.add("Add", {
    title: "Notification",
    type: "notification",
    user: user,
    target: post.user,
    cover: post.cover,
    annotation: annotation,
    notificationType: "vote",
    data: post.cover,
    link,
    entityId,
  });
};

export const calculateTotalPostVotes = async (post: Post, _user: User) => {
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
  _user: User
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
