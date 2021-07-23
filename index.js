import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import models from "./models";
// import { authUser } from "./service/auth"
import { createServer } from 'http';
// import { execute, subscribe } from 'graphql';
// import { SubscriptionServer } from 'subscriptions-transport-ws';

const app = express();

const startServer = async () => {

  // app.use(authUser);
  app.use(cors());
  app.use(express.json({ extended: true, limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  app.get('/', (req, res) => {
    res.send('Welcome to slack-clone-server')
  })

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req, res }) => ({ req, res })
  });

  await apolloServer.start()
  apolloServer.applyMiddleware({ app });

  const server = createServer(app);

  // apolloServer.installSubscriptionHandlers(server)

  const PORT = 5000;
  ////db connection
  models.sequelize.sync({ alter: true, force: true }).then(() => {
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