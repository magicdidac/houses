import { ApolloClient, InMemoryCache } from "@apollo/client";

export const ApiClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  cache: new InMemoryCache()
})