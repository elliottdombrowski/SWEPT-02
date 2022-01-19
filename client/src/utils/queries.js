import { gql } from '@apollo/client';

// works with the sweeper sched API for 'ward' + 'month_name' + 'month_number'
export const GET_WARD = gql`
  query getWard($wardNumber: String) {
    getWard(wardNumber: $wardNumber) {
      ward
      section
      month_name
      dates
    }
  }
`;

// works with the ward info API for 'zipcode'
export const GET_ZIP = gql`
  query getZip($zipNumber: String) {
    getZip(zipNumber: $zipNumber) {
      ward
      zipcode
    }
  }
`;

// works with the snow restriction parking info API for 'street'
export const GET_SNOW = gql`
  query getSnow($snowNumber: String) {
    getSnow(snowNumber: $snowNumber) {
      on_street
      from_stree
      to_street
      restrict_t
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

// save to db
export const QUERY_USER_SWEEPERS = gql`
  query getUserSweepers($user: String!) {
    getUserSweepers(user: $user) {
      _id
      ward
      section
      month_name
      dates
      user
    }
  }
`;

// save to db
export const QUERY_USER_SNOW = gql`
  query getUserSnow($user: String!) {
    getUserSnow(user: $user) {
      _id
      on_street
      from_stree
      to_street
      restrict_t
      user
    }
  }
`;

// delete from db
export const MUTATION_DELETE_SWEEPER = gql`
  mutation deleteSweeper($id: String!){
    deleteSweeper(id: $id)
  }
`

// delete from db
export const MUTATION_DELETE_SNOW = gql`
  mutation deleteSnow($id: String!){
    deleteSnow(id: $id)
  }
`