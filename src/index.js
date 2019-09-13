import express from "express";
import { ApolloServer } from "apollo-server-express";

import config from "./config/index";
import { typeDefs, resolvers } from "./schemas/index";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen({ port: config.port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`
  )
);
