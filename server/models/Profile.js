const mongoose = require('mongoose');
const { Schema, model } = mongoose;
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

const Profile = mongoose.model('Profile', User, profileSchema);

module.exports = Profile;