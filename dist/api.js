"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const data_1 = require("./data");
const CharacterType = new graphql_1.GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        nombre: { type: graphql_1.GraphQLString },
        species: { type: graphql_1.GraphQLString },
        url_image: { type: graphql_1.GraphQLString },
    }),
});
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        characters: {
            type: new graphql_1.GraphQLList(CharacterType),
            args: {
                species: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                const { species } = args;
                if (species) {
                    return data_1.data.filter(character => character.species === species);
                }
                return data_1.data;
            },
        },
    },
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
});
const app = (0, express_1.default)();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true,
}));
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
