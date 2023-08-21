import { resolvers } from './resolvers';
import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { typeDefs } from './typeDefs';

const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    introspection: true
})

export const handler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
)