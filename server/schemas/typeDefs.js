const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    savedWard: [Ward]
    savedZip: [Zip]
    saved: []
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

  type Snow {
    on_street: String,
    from_stree: String,
    to_street: String,
    restrict_t: String
  }
  
  type Query {
    users: [User]
    user(userId: ID!): User
    getWard(wardNumber: String): [Ward]
    getZip(zipNumber: String): [Zip]
    getSnow(snowNumber: String): [Snow]
    singleUser: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveWard(: ): User
    saveZip(: ): User
    saveSnow(: ): User
  }
  `;

module.exports = typeDefs;