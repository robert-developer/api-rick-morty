import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { data } from './src/data';

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    species: { type: GraphQLString },
    url_image: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    characters: {
      type: new GraphQLList(CharacterType),
      args: {
        species: { type: GraphQLString },
      },
      resolve(parent, args) {
        const { species } = args;
        if (species) {
          return data.filter(character => character.species === species);
        }
        return data;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});