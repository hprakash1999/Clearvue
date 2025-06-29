import gql from "graphql-tag";

/**
 * @module graphql/schemas/auth
 * GraphQL type definitions (SDL) for auth-related operations.
 *
 * Includes:
 * - User and Address object types
 * - Signup input & response types
 * - Login input & response types
 * - Common response type
 * - Root-level Mutation for auth operations
 * - Empty Query placeholder
 *
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

  input LoginInput {
    email: String!
    password: String!
  }

  type SignupResponse {
    success: Boolean!
    message: String!
    user: User!
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    user: User!
  }

  type CommonResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    signup(input: SignupInput!): SignupResponse!
    login(input: LoginInput!): LoginResponse!
    logout: CommonResponse!
  }

  type Query {
    _empty: String
  }
`;
