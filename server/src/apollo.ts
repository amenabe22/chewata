import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PostResolver } from "./resolvers/Post";
import { CommentResolver } from "./resolvers/Comment";
import { LikeResolver } from "./resolvers/Likes";
import { NotificationsResolver } from "./resolvers/Notifications";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { ApolloServerPluginCacheControl } from "apollo-server-core";

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
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      // responseCachePlugin({
      //   sessionId: () => {
      //     return "sessionId";
      //   },
      // }),
      // ApolloServerPluginCacheControl({
      //   // Cache everything for 1000 seconds.
      //   defaultMaxAge: 1000,
      //   // Don't send the `cache-control` response header.
      //   calculateHttpHeaders: false,
      // }),
    ],
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
  });
};
