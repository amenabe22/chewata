import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PostResolver } from "./resolvers/Post";
import { CommentResolver } from "./resolvers/Comment";
import { LikeResolver } from "./resolvers/Likes";
import { NotificationsResolver } from "./resolvers/Notifications";

export const apolloServerSetup = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        PostResolver,
        CommentResolver,
        LikeResolver,
        NotificationsResolver,
      ],
      validate: false,
    }),
    context: ({ req, res, connection }: any) => {
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
