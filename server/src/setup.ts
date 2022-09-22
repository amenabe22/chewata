import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { apolloServerSetup } from "./apollo";
import path from "path";
import history from "connect-history-api-fallback"

export async function startApolloServer() {
  // Same ApolloServer initialization as before
  const server = await apolloServerSetup();

  // Required logic for integrating with Express
  await server.start();

  const app = express();
  app.use(cookieParser());
  app.use(history({
    index: '/templates/index.html',
    // disableDotRule: true,
    // verbose: true
  });
  app.get("/", function (req, res) {
    // save html files in the `views` folder...
    res.sendfile(__dirname + "/templates/index.html");
  });
  app.get("/firebase-messaging-sw.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "assets/", "firebase-messaging-sw.js"));
  });
  app.use("/", express.static(__dirname));
  // app.use("/static", express.static("static")!);
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
