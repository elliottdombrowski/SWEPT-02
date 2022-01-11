const { User } = require('../models')
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {},
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