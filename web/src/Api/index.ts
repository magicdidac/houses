import { ApolloClient, InMemoryCache } from "@apollo/client";

export const ApiClient = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
})