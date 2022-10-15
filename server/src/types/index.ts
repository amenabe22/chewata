import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";
import { Notifications } from "../entity/Notification";
import { Community } from "../entity/Community";

export type MyContext = {
  req: Request & { session: any };
  res: Response;
  // pubsub: RedisPubSub,
  user: User;
  token: string;
};

@ObjectType()
export class VoteType {
  @Field()
  vote: number;

  @Field()
  voted: boolean;
}

@ObjectType()
export class PostsPaginatedResponse {
  @Field()
  page: number;

  @Field()
  per_page: number;

  @Field(() => Number)
  pre_page: number | null;

  @Field(() => Number)
  next_page: number | null;

  @Field(() => Number)
  total: number;

  @Field(() => Number)
  total_pages: number;

  @Field(() => [Post])
  data: Array<Post>;
}

@ObjectType()
export class CommentsPaginatedType {
  @Field()
  page: number;

  @Field()
  per_page: number;

  @Field(() => Number)
  pre_page: number | null;

  @Field(() => Number)
  next_page: number | null;

  @Field(() => Number)
  total: number;

  @Field(() => Number)
  total_pages: number;

  @Field(() => [Comment])
  data: Array<Comment>;
}

@ObjectType()
export class UserDataResponse {
  @Field(() => User)
  user: User;

  @Field(() => Int)
  notificationsCount: number;
}

@ObjectType()
export class NotificationResponse {
  @Field(() => Notifications)
  notification: Notifications;
}

@ObjectType()
export class PaginatedNotificationsResponse {
  @Field()
  page: number;

  @Field()
  per_page: number;

  @Field(() => Number)
  pre_page: number | null;

  @Field(() => Number)
  next_page: number | null;

  @Field(() => Number)
  total: number;

  @Field(() => Number)
  total_pages: number;

  @Field(() => [Notifications])
  data: Array<Notifications>;
}

@ObjectType()
export class StatType {
  @Field({ nullable: true })
  joined: boolean;

  @Field({ nullable: true })
  stat: String;
}

@ObjectType()
export class CommunityResponse {
  @Field({ nullable: true })
  community: Community;

  @Field({ nullable: true })
  stat: StatType;
}

@ObjectType()
export class CommunityPaginatedResponse {
  @Field()
  page: number;

  @Field()
  per_page: number;

  @Field(() => Number)
  pre_page: number | null;

  @Field(() => Number)
  next_page: number | null;

  @Field(() => Number)
  total: number;

  @Field(() => Number)
  total_pages: number;

  @Field(() => [Community])
  data: Array<Community>;
}
