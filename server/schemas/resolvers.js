const { User } = require('../models')
const axios = require('axios');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    // ward from *sweeper scheule* api
    getWard: async (parent, args, context) => {
      try {
        console.log('is this undefined?', args);
        if (!args.wardNumber) {
          return null;
        }
        const sweeperData = {
          method: 'GET',
          url: 'https://data.cityofchicago.org/resource/wvjp-8m67.json',
          data: {
            '$limit': 5,
            '$$app_token': process.env.SWEEPER
          }
        }
        const sweeperResponse = await axios.request(sweeperData)
        // console.log(sweeperResponse.data);
        return sweeperResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    // zipcode from *general ward* api
    getZip: async (parents, args, context) => {
      try {
        console.log('is this undefined?????', args);
        if (!args.zipNumber) {
          return null;
        }
        const zipData = {
          method: 'GET',
          url: 'https://data.cityofchicago.org/resource/htai-wnw4.json',
          data: {
            '$limit': 5,
            '$$app_token': process.env.ZIP
          }
        }
        
      },

  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('no user found with this email');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('incorrect password.');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};



module.exports = resolvers;