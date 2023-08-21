import { resolvers } from './resolvers';
import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { readFileSync } from 'fs'
import * as path from 'path'

export const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), { encoding: 'utf-8' })

const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    introspection: true
})

export const handler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
)