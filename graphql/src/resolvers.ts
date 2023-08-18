import { addHouse, anaNotes, anaRate, didacNotes, didacRate, disableHouse, editHouse, getHouseById, getHouses } from "./functions/Houses";

export const resolvers = {
    Query: {
        getHouses: () => getHouses(),
        getHouseById: (_, args) => getHouseById(args.id),
    },
    Mutation: {
        addHouse: (_, args) => addHouse(args.link, args.price, args.anaRate, args.didacRate, args.anaNotes, args.didacNotes),
        disableHouse: (_, args) => disableHouse(args.id),
        editHouse: (_, args) => editHouse(args.id, args.link, args.price),
        anaRate: (_, args) => anaRate(args.id, args.rate),
        didacRate: (_, args) => didacRate(args.id, args.rate),
        anaNotes: (_, args) => anaNotes(args.id, args.notes),
        didacNotes: (_, args) => didacNotes(args.id, args.notes),
    }
}