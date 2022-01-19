const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Ward {
    ward: String,
    section: String,
    month_name: String,
    dates: String
  }

  type Zip {
    ward: String,
    zipcode: String
  }

  type SaveSweeper {
    ward: String,
    section: String,
    month_name: String,
    dates: String,
    zipcode: String,
    user: String
  }

  type Snow {
    on_street: String,
    from_stree: String,
    to_street: String,
    restrict_t: String
  }

  type SaveSnow {
    on_street: String,
    from_stree: String,
    to_street: String,
    restrict_t: String,
    user: String
  }
  
  type Query {
    users: [User]
    user(userId: ID!): User
    getWard(wardNumber: String): [Ward]
    getZip(zipNumber: String): [Zip]
    getSnow(snowNumber: String): [Snow]
    me: User
    getUserSnow(user: String!): [SaveSnow]
    getUserSweepers(user: String!): [SaveSweeper]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveSweeper(ward: String!, section: String!, month_name: String!, dates: String!, zipcode: String!, user: String!): SaveSweeper
    saveSnow(on_street: String!, from_stree: String!, to_street: String!, restrict_t: String!, user: String!): SaveSnow
  }
  `;

module.exports = typeDefs;