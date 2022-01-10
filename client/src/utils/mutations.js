import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    logim(email: $email, password: $password) {
      token
      user {
        _ids
      }
    }
  }
`;