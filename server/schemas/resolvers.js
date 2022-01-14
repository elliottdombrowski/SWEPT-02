const { User } = require('../models')
const axios = require('axios');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const lookupWard = async (zip) => {
  console.log('hitting lookupWard ', zip);
  // Hit city zip lookup
  const zipData = {
    method: 'GET',
    url: `https://data.cityofchicago.org/resource/htai-wnw4.json?zipcode=${zip}`,
    data: {
      '$limit': 5,
      '$$app_token': process.env.ZIP
    }
  }
  const zipResponse = await axios.request(zipData);
  console.log('full response ', zipResponse.data);
  // console.log('full zip response- ', zipResponse.data[0].zipcode);
  for (i = 0; i < zipResponse.data.length; i++) {
    if (zip === zipResponse.data[i].zipcode) {
      console.log('zip response- ', zipResponse.data[i].zipcode);
      return zipResponse.data[i].ward;
    }
  }
  // return 14
}


const resolvers = {
  Query: {
    // ward from *sweeper scheule* api
    getWard: async (parent, args, context) => {
      try {
        console.log('is this undefined?', args);
        if (!args.wardNumber) {
          return null;
        }
        if (args.wardNumber.length == 5) {
          args.wardNumber = await lookupWard(args.wardNumber);
          console.log('looking up zipcode with ward ', args.wardNumber);
        }
        const sweeperData = {
          method: 'GET',
          url: `https://data.cityofchicago.org/resource/wvjp-8m67.json?ward=${args.wardNumber}`,
          data: {
            '$limit': 5,
            '$$app_token': process.env.SWEEPER
          }
        }
        const sweeperResponse = await axios.request(sweeperData)
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
        const zipResponse = await axios.request(zipData)
        // console.log(sweeperResponse.data);
        return zipResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    // street name from *snow restriction* api
    getSnow: async (parents, args, context) => {
      try {
        console.log('is this undefined?????', args);
        if (!args.snowNumber) {
          return null;
        }
        const snowData = {
          method: 'GET',
          url: 'https://data.cityofchicago.org/resource/i6k4-giaj.json',
          data: {
            '$limit': 5,
            '$$app_token': process.env.SNOW
          }
        }
        const snowResponse = await axios.request(snowData)
        // console.log(sweeperResponse.data);
        return snowResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    singleUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('');
      }
      throw new AuthenticationError('You must be logged in!');
    }
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