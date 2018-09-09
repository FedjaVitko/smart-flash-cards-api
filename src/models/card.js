const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

module.exports = CardSchema = new mongoose.Schema(
    {
        question : {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        tokenizedAnswerJson: {
            type: String,
            required: true
        },
        difficulty: {
            type: Number,
            required: true,
            default: 50
        }
    },
    { collection: 'cards' },
);

CardSchema.plugin(timestamps, {
    createdAt: { index: true },
    updatedAt: { index: true }
});

module.exports = exports = mongoose.model('Card', CardSchema);