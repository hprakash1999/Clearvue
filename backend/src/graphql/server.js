import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApiError } from "../utils/ApiError.js";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schemas.js";

// Setup GraphQL server
export const setupGraphQL = async (app) => {
  // Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      if (error.originalError instanceof ApiError) {
        return {
          message: error.message,
          statusCode: error.originalError.statusCode,
          success: false,
          errors: error.originalError.errors || [],
          stack: error.originalError.stack,
        };
      }

      return {
        message: error.message,
      };
    },
  });

  // Start server
  await server.start();

  // GraphQL middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
};
