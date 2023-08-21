import { Resolvers } from "./__generated__/resolvers-types";
import { addHouse, disableHouse, editHouse, getHouseById, getHouses, isDuplicated } from "./functions/house";

export const resolvers: Resolvers = {
    Query: {
        getHouses: () => getHouses(),
        getHouseById: (_, args) => getHouseById(args),
        isDuplicated: (_, args) => isDuplicated(args),
    },
    Mutation: {
        addHouse: (_, args) => addHouse(args),
        editHouse: (_, args) => editHouse(args),
        disableHouse: (_, args) => disableHouse(args),
    }
}