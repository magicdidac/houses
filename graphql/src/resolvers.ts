import { getExample } from "./functions/Example";

export const resolvers = {
    Query: {
        getExample: () => getExample()
    }
}