import { ApolloClient, InMemoryCache } from "@apollo/client";

export const ApiClient = new ApolloClient({
  uri: "https://81tvnbigpe.execute-api.us-east-1.amazonaws.com/prod/",
  cache: new InMemoryCache()
})