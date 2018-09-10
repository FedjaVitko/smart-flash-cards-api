const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const validator = require('validator');

module.exports = CardSchema = new mongoose.Schema(
    {
        question : {
            type: String,
            required: [true, 'Please enter the question'],
            unique: true,
            trim: true
        },
        answer: {
            type: String,
            required: [true, 'Please enter the answer'],
            trim: true
        },
        tokenizedAnswerJson: {
            type: String,
            required: true,
            validate: [ validator.isJSON, 'Invalid answer format' ]
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