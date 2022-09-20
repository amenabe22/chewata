import { Resolver, Mutation, Query } from "type-graphql";

export class UserResolver {
  @Query(() => String)
  async test() {
    return "Hello World";
  }
}
