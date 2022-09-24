import fs from "fs";
import cors from "cors";
import express from "express";
import path, { join } from "path";
import cookieParser from "cookie-parser";
import { apolloServerSetup } from "./apollo";
// @ts-ignore
import history from "connect-history-api-fallback";

export async function startApolloServer() {
  // Same ApolloServer initialization as before
  const server = await apolloServerSetup();

  // Required logic for integrating with Express
  await server.start();

  const app = express();
  app.use(cookieParser());
  // app.use(
  //   history({
  //     index: "/templates/index.html",
  //     // disableDotRule: true,
  //     // verbose: true
  //   })
  // );
  const excluded = [
    "/",
    "/user",
    "/game/*",
    "/game",
    "/user/*",
    "/notification",
    "/privacy",
  ];
  app.get(excluded, function (_, res) {
    const templatePath = join(__dirname, "/assets/index.html");
    console.log(templatePath,"path")
    fs.readFile(templatePath, "utf-8", (err, content) => {
      if (err) {
        console.log("can't open file");
      }
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      return res.end(content);
    });
    // res.sendFile(join());
  });
  app.use("/", express.static(__dirname));
  app.get("/", function (_req, res) {
    // save html files in the `views` folder...
    res.sendfile(__dirname + "/templates/index.html");
  });
  app.get("/firebase-messaging-sw.js", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname, "assets/", "firebase-messaging-sw.js")
    );
  });
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
