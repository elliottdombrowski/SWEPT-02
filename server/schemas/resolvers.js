const { User } = require('../models')
const axios = require('axios');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
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
      }
    }
};



module.exports = resolvers;