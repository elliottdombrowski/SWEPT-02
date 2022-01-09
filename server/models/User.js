const mongoose = require('mongoose');

// userSchema:
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
  });

module.exports = User;