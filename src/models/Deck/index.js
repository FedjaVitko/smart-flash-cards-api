const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

module.exports = DeckSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        cards: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Card',
                required: true,
                autopopulate: true,
            }
        ]
    },
    { collection: 'decks' },
);

DeckSchema.plugin(timestamps, {
    createdAt: { index: true },
    updatedAt: { index: true }
});

module.exports = exports = mongoose.model('Deck', DeckSchema);