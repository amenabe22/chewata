import fs from "fs";
import cors from "cors";
import express from "express";
import path, { join } from "path";
import cookieParser from "cookie-parser";
import { apolloServerSetup } from "./apollo";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
// @ts-ignore
import history from "connect-history-api-fallback";
import { coreBullQ, setupBullMQProcessor } from "./queue";
import compression from "compression";
import http from "http";

export async function startApolloServer() {
  // Same ApolloServer initialization as before
  const server = await apolloServerSetup();

  // Required logic for integrating with Express
  await server.start();

  const app = express();
  app.use(cookieParser());
  await setupBullMQProcessor(coreBullQ.name);
  app.use(compression());

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/ui");
  const httpServer = http.createServer(app);

  createBullBoard({
    queues: [new BullMQAdapter(coreBullQ)],
    serverAdapter,
  });

  app.use("/ui", serverAdapter.getRouter());
  const excluded = [
    "/*",
    "/user",
    "/post",
    "/new",
    "/jema",
    "/explore",
    "/login",
    "/game/*",
    "/game",
    "/user/*",
    "/tag/*",
    "/notification",
    "/privacy",
  ];
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
  app.get("/sitemap.xml", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "assets/", "sitemap.xml"));
  });

  app.get("/ads.txt", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "assets/", "ads.txt"));
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
      origin: [
        "http://127.0.0.1:3000",
        "http://192.168.1.10:3000",
        "http://127.0.0.1:4000",
        "http://172.20.10.5:3000",
        "https://chewata-staging.netlify.app/",
      ],
    },
  });
  app.get(excluded, function (_, res) {
    const templatePath = join(__dirname, "/templates/index.html");
    console.log(templatePath, "path");
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

  app.use(
    cors({
      origin: [
        "http://127.0.0.1:3000",
        "http://192.168.1.10:3000",
        "http://127.0.0.1:4000",
        "http://172.20.10.5:3000",
        "https://chewata-staging.netlify.app/",
      ],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
    })
  );
  // Modified server startup
  // await new Promise((resolve: any) => app.listen({ port: 4000 }, resolve));
  httpServer.listen(4000, () => {
    server.installSubscriptionHandlers(httpServer);
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
}
