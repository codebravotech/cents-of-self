import { ApolloServer } from "apollo-server";
import typeDefs from "./src/schema";
import resolvers from "./src/resolvers";
import { PrismaClient } from "./generated/prisma";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    prisma: new PrismaClient(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  GQL Server ready at ${url}`);
});
