const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }
  
  type Query {
    user: User
  }
  `;

module.exports = typeDefs;