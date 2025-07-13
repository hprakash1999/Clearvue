import { gql } from "@apollo/client";

// Avatar Upload
export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($input: Upload!) {
    avatar(input: $input) {
      success
      message
    }
  }
`;

// Update User Profile
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      success
      message
    }
  }
`;
