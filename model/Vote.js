const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;