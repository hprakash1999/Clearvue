import gql from "graphql-tag";

/**
 * @module graphql/schemas/user
 * GraphQL type definitions (SDL) for user-related operations.
 *
 * Includes:
 * - Avatar object input types
 * - Common response type
 * - Root-level Mutation for user operations
 * - Empty Query placeholder
 *
 */
export const userTypeDefs = gql`
  scalar Upload

  type CommonResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    avatar(input: Upload!): CommonResponse!
  }

  type Query {
    _empty: String
  }
`;
