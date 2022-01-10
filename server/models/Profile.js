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
        type: String,
        trim: true
    },
    ward: {
        type: Number,
        trim: true
    },
    zip: {
        type: Number,
        trim: true
    },
});

module.exports = Profile;