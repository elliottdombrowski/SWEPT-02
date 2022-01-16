const mongoose = require('mongoose');
const { Schema } = mongoose;

// snowSchema (best to keep seperate probs)
const snowSchema = new Schema({
    on_street: {
        type: String,
        required: true
    },
    // 'stree' ON PURPOSE due to API error
    from_stree: {
        type: String,
        required: true
    },
    to_street: {
        type: String,
        required: true
    }
})

const Snow = mongoose.model('Snow', snowSchema);

module.exports = Snow;