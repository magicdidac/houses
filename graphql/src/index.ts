import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { ApolloServer } from "apollo-server-lambda";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
})

export const handler = server.createHandler()