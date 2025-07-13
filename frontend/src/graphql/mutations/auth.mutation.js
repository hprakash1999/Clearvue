import { gql } from "@apollo/client";

// Login mutation
export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      message
      user {
        _id
        firstName
        lastName
        avatar
        email
        gender
        role
      }
    }
  }
`;
