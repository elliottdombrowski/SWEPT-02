const { User } = require('../models')
const axios = require('axios');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { DateTime } = require('luxon');

//HANDLE ZIPCODE LOOKUP FROM WARD FORM
//TAKES IN A WARD INPUT OF 5 CHARACTERS AS PARAMETER
const lookupWard = async (zip) => {
  // HIT CITY ZIPCODE API W/ 5 CHARACTER WARD INPUT
  const zipData = {
    method: 'GET',
    url: `https://data.cityofchicago.org/resource/htai-wnw4.json?zipcode=${zip}`,
    data: {
      '$limit': 5,
      '$$app_token': process.env.ZIP
    }
  }
  const zipResponse = await axios.request(zipData);
  //FOR EACH RESPONSE, CHECK IF API DATA ZIPCODE MATCHES INPUT
  for (i = 0; i < zipResponse.data.length; i++) {
    if (zip === zipResponse.data[i].zipcode) {
      return zipResponse.data[i].ward;
    }
  }
};

const resolvers = {
  Query: {
    // ward from *sweeper scheule* api
    getWard: async (parent, args, context) => {
      try {
        //GRAB CURRENT CST TIME
        const centralTime = DateTime.local().setZone('America/Chicago');
        //GRAB CURRENT MONTH AND DAY AS SEPARATE VARIABLES.
        //PARSE MONTH TO UPPERCASE TO MATCH API FORMAT
        let currMonth = centralTime.toLocaleString({ month: 'long' }).toUpperCase();
        let currDay = centralTime.toLocaleString({ day: 'numeric' });
        let dateArr = [];
        //DECLARING TESTING ARRAYS
        //THERE'S NO STREET SWEEPING IN THE WINTER. DUH.
        let currMonthTest = 'AUGUST';
        let currDayTest = '23';
        let dateTestArr = ['20', '21', '22', '23', '24', '25'];

        //FOR CURRENT DATE, PUSH DATE + 1 TO DATE ARRAY TO CHECK FULL WEEK
        //PARSE DATE TO INT TO ADD, THEN PARSE TO STRING
        for (i = 0; i < 7; i++) {
          dateArr.push((parseInt(currDayTest) + i).toString());
        }

        //FOR TESTING PURPOSES.
        dateTestArr = dateArr;

        //IF NO WARD # FOUND, RETURN
        if (!args.wardNumber) {
          return null;
        }

        //IF WARD NUMBER INPUT == 5 CHARACTERS, ASSUME IT'S A ZIPCODE
        //AND CALL LOOKUPWARD WITH WARD NUMBER INPUT AS PARAMETER
        if (args.wardNumber.length == 5) {
          args.wardNumber = await lookupWard(args.wardNumber);
        }
        const sweeperData = {
          method: 'GET',
          url: `https://data.cityofchicago.org/resource/wvjp-8m67.json?ward=${args.wardNumber}`,
          data: {
            '$limit': 5,
            '$$app_token': process.env.SWEEPER
          }
        }
        const sweeperResponse = await axios.request(sweeperData);

        //DECLARE EMPTY ARRAY FOR MATCHED RESPONSES
        let responseArr = [];
        //FOR EACH RECORD IN SWEEPERDATA, CHECK IF CURRENT MONTH MATCHES API'S MONTH_NAME FIELD
        for (let i = 0; i < sweeperResponse.data.length; i++) {
          if (currMonthTest == sweeperResponse.data[i].month_name) {
            //ONCE A MONTH_NAME MATCH IS FOUND, CHECK IF MONTH/WARD MATCH INCLUDES CURRENT DATES
            const findMatch = sweeperResponse.data[i].dates.split(',').filter(event => dateTestArr.includes(event));

            //IF ONE OR MORE MATCH IS FOUND, PUSH TO RESPONSE ARRAY
            if (findMatch.length > 0) {
              responseArr.push(sweeperResponse.data[i]);
            }
          }
        }
        //RETURN RESPONSE ARRAY TO CLIENT
        return responseArr;
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
          url: `https://data.cityofchicago.org/resource/i6k4-giaj.json?on_street=${args.snowNumber.toUpperCase()}`,
          data: {
            '$limit': 5,
            '$$app_token': process.env.SNOW
          }
        }
        const snowResponse = await axios.request(snowData)
        console.log('load ', snowResponse.data);
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