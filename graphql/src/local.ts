import { typeDefs } from ".";
import { resolvers } from "./resolvers";
import { ApolloServer } from "@apollo/server";

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.start().then(() => {
    console.log(`🚀 Server ready`)
})