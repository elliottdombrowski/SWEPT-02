import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_SWEEPER = gql`
mutation saveSweeper($ward: String!, $section: String!, $month_name: String!, $dates: String!, $zipcode: String!, $user: String!) {
  saveSweeper(ward: $ward, section: $section, month_name: $month_name, dates: $dates, zipcode: $zipcode, user: $user)
}
`;