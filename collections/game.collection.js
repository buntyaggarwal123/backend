const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    userId: { type: Number, required: true },
    score: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

module.exports = mongoose.model('game', gameSchema);
