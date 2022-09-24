import { createApolloProvider } from "@vue/apollo-option";
import { ApolloClient, ApolloLink, createHttpLink, HttpLink, InMemoryCache } from "@apollo/client/core"

const prod = !true;
const uri = prod
  ? "https://chewata.fun/graphql"
  : "http://127.0.0.1:4000/graphql/";

export const httpLink = createHttpLink({
  uri,
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  credentials: "include",
  uri: uri,
});

// Create a provider
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
