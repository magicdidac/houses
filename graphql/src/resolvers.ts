import { Resolvers } from "./__generated__/resolvers-types";
import { addHouse, anaNotes, anaRate, didacNotes, didacRate, disableHouse, editHouse, getHouseById, getHouses, isDuplicated } from "./functions/Houses";

export const resolvers: Resolvers = {
    Query: {
        getHouses: () => getHouses(),
        getHouseById: (_, args) => getHouseById(args),
        isDuplicated: (_, args) => isDuplicated(args),
    },
    Mutation: {
        addHouse: (_, args) => addHouse(args),
        disableHouse: (_, args) => disableHouse(args),
        editHouse: (_, args) => editHouse(args),
        anaRate: (_, args) => anaRate(args),
        didacRate: (_, args) => didacRate(args),
        anaNotes: (_, args) => anaNotes(args),
        didacNotes: (_, args) => didacNotes(args),
    }
}