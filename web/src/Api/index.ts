import { ApolloClient, InMemoryCache } from "@apollo/client";

export const ApiClient = new ApolloClient({
  uri: "https://iggry963yf.execute-api.eu-west-3.amazonaws.com/prod/",
  cache: new InMemoryCache()
})