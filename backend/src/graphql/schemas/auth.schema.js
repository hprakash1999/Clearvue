import gql from "graphql-tag";

/**
 * @module graphql/schemas/auth.schema
 * GraphQL type definitions (SDL) for auth-related operations.
 *
 * Includes:
 * - User and Address object types
 * - Signup input & response types
 * - Root-level Mutation for user signup
 * - Empty Query placeholder
 */
export const authTypeDefs = gql`
  type Address {
    street: String!
    city: String!
    state: String!
    country: String!
    pincode: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    gender: String!
    address: Address!
    role: String!
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    country: String!
    pincode: String!
  }

  input SignupInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    password: String!
    gender: String!
    address: AddressInput!
  }

  type SignupResponse {
    success: Boolean!
    message: String!
    user: User!
  }

  type Mutation {
    signup(input: SignupInput!): SignupResponse!
  }

  type Query {
    _empty: String
  }
`;
