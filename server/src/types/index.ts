import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { Field, ObjectType } from "type-graphql";
import { User } from "../entity/User";

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
