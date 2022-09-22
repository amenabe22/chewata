import "reflect-metadata";
import { startApolloServer } from "./setup";
import { initDb } from "./data-source";
import admin from "firebase-admin";
import { FIREBASE_CONFIG } from "./config.firebase";

const main = async () => {
  initDb();
  await admin.initializeApp(FIREBASE_CONFIG);
  await startApolloServer();
};

main().catch((err) => {
  console.error(err);
});
