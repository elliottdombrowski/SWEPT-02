const mongoose = require('mongoose');
const { Schema } = mongoose;

// snowSchema (best to keep seperate probs)
const snowSchema = new Schema({
    on_street: {
        type: String,
        required: true
    },
    from_stree: {
        type: String,
        required: true
    },
    to_street: {
        type: String,
        required: true
    },
})



module.exports = Snow;