import { resolvers } from './resolvers';
import typeDefs from './typeDefs';
import { ApolloServer } from 'apollo-server-lambda';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
})

export const handler = server.createHandler()