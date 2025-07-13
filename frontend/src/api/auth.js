import { gql } from "@apollo/client";
import { apolloClient } from "./client";

// Login mutation
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      message
      user {
        _id
        email
        role
      }
    }
  }
`;

// Login api
export const loginExistedUser = async (input) => {
  const { data } = await apolloClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { input },
  });

  return data.login;
};
