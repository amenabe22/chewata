import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { PostResolver } from "./resolvers/Post";
import { CommentResolver } from "./resolvers/Comment";
import { LikeResolver } from "./resolvers/Likes";

export const apolloServerSetup = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, CommentResolver, LikeResolver],
      validate: false,
    }),
    context: ({ req, res, connection }) => {
      if (connection) {
        return { ...connection.context };
      } else {
        // const fapp =
        const token = req.headers.authorization;
        return {
          req,
          res,
          // redis,
          // pubSub,
          connection,
          token,
        };
      }
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
};
