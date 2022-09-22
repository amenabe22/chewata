import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { apolloServerSetup } from "./apollo";

export async function startApolloServer() {
  // Same ApolloServer initialization as before
  const server = await apolloServerSetup();

  // Required logic for integrating with Express
  await server.start();

  const app = express();
  app.use(cookieParser());

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/graphql",
    cors: {
      credentials: true,
      origin: ["http://127.0.0.1:3000", "http://127.0.0.1:4000"],
    },
  });
  app.use(
    cors({
      origin: ["http://127.0.0.1:3000", "http://127.0.0.1:4000"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
    })
  );
  // Modified server startup
  await new Promise((resolve: any) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
