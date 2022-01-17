const mongoose = require('mongoose');
const { Schema } = mongoose;

// snowSchema (best to keep seperate probs)
const snowSchema = new Schema({
    on_street: {
        type: String,
        required: true
    },
    // 'stree' ON PURPOSE due to API typo
    from_stree: {
        type: String,
        required: true
    },
    to_street: {
        type: String,
        required: true
    },
    restrict_t: {
        type: String,
        required: true
    },
    user: {
        // set to ObjectId for db match
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Snow = mongoose.model('Snow', snowSchema);

module.exports = Snow;