const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// const User = require('./User')

const profileSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    // className='street-input street-btn'
    street: {
        type: String,
        trim: true
    },
    // className='ward-input ward-btn'
    ward: {
        type: Number,
        trim: true
    },
    // className='zipform-input zipform-btn'
    zip: {
        type: Number,
        trim: true
    },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;