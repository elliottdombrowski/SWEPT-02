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
    _id: ID
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
    _id: ID
    on_street: String,
    from_stree: String,
    to_street: String,
    restrict_t: String,
    user: String
  }

  type Status {
    status: String
  }

  input stripeCard {
    id: ID
    address_city: String
    address_country: String
    address_line1: String
    address_line2: String
    address_state: String
    address_zip: String
    name: String
  }

  input stripeToken {
    email: String
    id: ID
    card: stripeCard
  }

  input stripeDonation {
    price: Float
    name: String
  }

  input StripeInfo {
    token: stripeToken
    donation: stripeDonation
  }

  type Query {
    me: User
    users: [User]
    user(userId: ID!): User
    getWard(wardNumber: String): [Ward]
    getZip(zipNumber: String): [Zip]
    getSnow(snowNumber: String): [Snow]
    getUserSnow(user: String!): [SaveSnow]
    getUserSweepers(user: String!): [SaveSweeper]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveSweeper(ward: String!, section: String!, month_name: String!, dates: String!, zipcode: String!, user: String!): SaveSweeper
    saveSnow(on_street: String!, from_stree: String!, to_street: String!, restrict_t: String!, user: String!): SaveSnow
    makeDonation(input: StripeInfo): Status
    deleteSweeper(id: String!): Boolean  
    deleteSnow(id:String!): Boolean
  }
  `;

module.exports = typeDefs;