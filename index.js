import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import db from "./models";
import { createServer } from 'http';
import path from 'path'
import { mergeTypes, fileLoader, mergeResolvers } from "merge-graphql-schemas";

const app = express();

const startServer = async () => {

  const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
  const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

  // app.use(authUser);
  app.use(cors());
  app.use(express.json({ extended: true, limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  app.get('/', (req, res) => {
    res.send('Welcome to graphqQL-slack-clone-server')
  })

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: { db }
  });

  await apolloServer.start()
  apolloServer.applyMiddleware({ app });

  const server = createServer(app);

  // apolloServer.installSubscriptionHandlers(server)

  const PORT = 5000;
  ////db connection
  db.sequelize.sync({ alter: true, force: false }).then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}${apolloServer.graphqlPath}`)

      // ///////////// suscription
      // new SubscriptionServer({
      //   execute,
      //   subscribe,
      //   schema: apolloServer,
      // }, {
      //   server,
      //   path: '/subscriptions',
      // });
    });
  })

}

startServer();