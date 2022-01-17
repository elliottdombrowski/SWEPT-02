const mongoose = require('mongoose');
const { Schema } = mongoose;

// sweeperSchema
const sweeperSchema = new Schema({
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
    },
    user: {
        // saving as ObjectId helps connect the user + saved items
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    zipcode: {
        type: String
    },
});


const Sweeper = mongoose.model('Sweeper', sweeperSchema);

module.exports = Sweeper;