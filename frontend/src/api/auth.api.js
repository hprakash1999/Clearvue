import { apolloClient } from "./client.api.js";

// Mutations
import { LOGIN_MUTATION } from "../graphql/mutations/auth.mutation.js";

// Login api
export const loginExistedUser = async (input) => {
  const { data } = await apolloClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { input },
  });

  return data.login;
};
