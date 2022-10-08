import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PostResolver } from "./resolvers/Post";
import { CommentResolver } from "./resolvers/Comment";
import { LikeResolver } from "./resolvers/Likes";
import { NotificationsResolver } from "./resolvers/Notifications";
import { verify } from "jsonwebtoken";
import { JWT_KEY } from "./constants";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { pubSub } from "./pubsub";

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
      pubSub,
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground() as any],
    subscriptions: {
      path: "/subscriptions",
      onConnect: async (auth: any, ws: any, context) => {
        // console.log(Object.keys(ws), "Context");
        // const wsSession = await new Promise((resolve) => {
        // use same session parser as normal gql queries
        if (auth.Authorization) {
          const token = auth.Authorization;
          // src / ent_types / profile_types
          const payload: any = verify(token, JWT_KEY!);
          // Handle subscriptions auth for just normal users
          if (payload.userId) {
            const user_query = await AppDataSource.manager.find(User, {
              where: {
                id: payload.userId,
              },
            });

            if (user_query.length == 0) {
              // some anomally
              throw Error("User not found");
            }
            const user = user_query[0];
            return { user, token };
          } else {
            return new Error("Not Authenticated");
          }
          // Handle subscriptions auth for just mods
        } else {
          return new Error("Not Authenticated");
        }
      },
    },
    context: async ({ req, res, connection }) => {
      // console.log(connection,"CONNECTION")
      if (connection) {
        // const token: any = req.cookies.JWT;
        // console.log(token,"TAKI")
        // console.log(connection.context,"ctx")
        return { ...connection.context, pubSub };
      } else {
        let user: any;
        const token: any = req.cookies.JWT;
        if (token) {
          const payload: any = verify(token, JWT_KEY!);
          // Handle subscriptions auth for just normal users
          if (payload.userId) {
            const user_query = await AppDataSource.manager.find(User, {
              where: {
                id: payload.userId,
              },
            });
            if (user_query.length) {
              user = user_query[0];
            }
          }
        }
        // const fapp =
        // console.log(req.cookies.JWT, "TIK");
        // const token = req.headers.authorization;
        return {
          req,
          res,
          user,
          pubSub,
          connection,
          token,
        };
      }
    },
    playground: true,
    introspection: true,
  });
};
