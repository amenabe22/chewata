import "reflect-metadata";
import { startApolloServer } from "./setup";
import { initDb } from "./data-source";

const main = async () => {
  initDb();
  await startApolloServer();
};

main().catch((err) => {
  console.error(err);
});
