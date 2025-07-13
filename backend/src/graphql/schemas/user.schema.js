import gql from "graphql-tag";

/**
 * @module graphql/schemas/user
 * GraphQL type definitions (SDL) for user-related operations.
 *
 * Includes:
 * - Avatar object input types
 * - Update user profile input types
 * - Common response type
 * - Root-level Mutation for user operations
 * - Empty Query placeholder
 */
export const userTypeDefs = gql`
  scalar Upload

  input UpdateUserProfileInput {
    firstName: String
    lastName: String
    phone: String
    address: AddressInput
  }

  input AddressInput {
    street: String
    city: String
    state: String
    country: String
    pincode: String
  }

  type CommonResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    avatar(input: Upload!): CommonResponse!
    updateUserProfile(input: UpdateUserProfileInput!): CommonResponse!
  }

  type Query {
    _empty: String
  }
`;
