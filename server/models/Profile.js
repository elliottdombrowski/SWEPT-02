const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User')

const profileSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    street: {
        type: string,
        trim: true
    },

});

module.exports = Profile;