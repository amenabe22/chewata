import { createApolloProvider } from "@vue/apollo-option";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { split } from "apollo-link";
import { store } from "./store";

const prod = !true;
const uri = prod
  ? "https://chewata.fun/graphql"
  : "http://127.0.0.1:4000/graphql/";

const wsUri = prod
  ? "wss://chewata.fun/subscriptions"
  : "ws://127.0.0.1:4000/subscriptions";

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri,
  credentials: "include",
});

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    connectionParams: () => {
      const cookies = store.state.ctk;
      console.log(cookies, "Cooks");
      return {
        Authorization: cookies,
      };
    },
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link: any = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  credentials: "include",
});

// Create a provider
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
