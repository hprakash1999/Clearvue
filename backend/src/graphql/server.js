import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApiError } from "../utils/apiError.js";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schemas.js";

/**
 * @module graphql/server
 * Initializes and configures the Apollo GraphQL server.
 *
 * Features:
 * - Custom error formatting using ApiError
 * - TypeDefs and resolvers wiring
 * - Injects request/response into context for access in resolvers
 *
 * @function setupGraphQL
 * @param {Express.Application} app - Express app instance
 * @returns {Promise<void>}
 */
export const setupGraphQL = async (app) => {
  // Initialize Apollo Server with schema and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    // Custom error formatter
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

      // Fallback error formatting
      return {
        message: error.message,
      };
    },
  });

  // Start the Apollo Server
  await server.start();

  // Mount Apollo middleware on Express under /graphql
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }), // Pass context to resolvers
    })
  );
};
