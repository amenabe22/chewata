import { InputType, Field } from "type-graphql";

@InputType()
export class PostInputType {
  @Field()
  content: string;

  @Field({ nullable: true })
  cover: string;

  @Field(() => [String], { nullable: true })
  tags: string[];
}

@InputType()
export class PaginationInputType {
  @Field()
  page: number;

  @Field()
  pageSize: number;
}

@InputType()
export class VoteInputType {
  @Field()
  vote: number;

  @Field()
  type: string;

  @Field()
  entityId: string;
}

@InputType()
export class CommentInput {
  @Field({ nullable: true })
  cover?: string;

  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  post?: string;

  @Field({ nullable: true })
  replyTo?: string;

  @Field({ nullable: true })
  isReply?: boolean;
}

@InputType()
export class CommunityInputType {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  type: string;
}
