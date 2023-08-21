import { resolvers } from "./resolvers";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./typeDefs";

const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers
})

startStandaloneServer(server, {
    listen: { port: 4000 }
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})