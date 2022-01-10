const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User')

const profileSchema = new Schema({
username: {
    type: String,
    required: true,
    unique: true
},


});

module.exports = Profile;