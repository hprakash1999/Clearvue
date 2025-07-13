import { apolloClient } from "../graphql/client";

// Mutations
import { UPDATE_USER_PROFILE, UPLOAD_AVATAR } from "../graphql/mutations/user.mutations";

// Upload Avatar
export const uploadAvatar = async (file) => {
  const { data } = await apolloClient.mutate({
    mutation: UPLOAD_AVATAR,
    variables: { input: file },
  });

  return data.avatar;
};

// Update User Profile
export const updateUserProfile = async (input) => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_USER_PROFILE,
    variables: { input },
  });

  return data.updateUserProfile;
};
