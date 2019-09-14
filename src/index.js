import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { MongoMemoryServer } from "mongodb-memory-server";

import config from "./config/";
import resolvers from "./resolvers";
import typeDefs from "./schemas/";

// Create server express
const app = express();

// Use CORS
app.use(cors());

// Constructor: schema definition and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
  })
});

// Connection to MongoDB
const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer.getConnectionString().then(mongoUri => {
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on("error", e => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`🚀 Database running on ${mongoUri}`);
  });
});

// Applying Apollo middleware
server.applyMiddleware({ app });

app.listen({ port: config.port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`
  )
);

export default app;
