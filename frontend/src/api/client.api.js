import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Http link
const httpLink = createHttpLink({
  uri: "http://localhost:8000/api/graphql",
  credentials: "include",
});

// Apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
