const mongoose = require('mongoose');
const { Schema } = mongoose;

// sweeperSchema
const sweeperSweeper = new Schema({
    ward: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    month_name: {
        type: String,
        required: true
    },
    dates: {
        type: String,
        required: true
    }
});


const Sweeper = mongoose.model('Sweeper', userSchema);

module.exports = Sweeper;