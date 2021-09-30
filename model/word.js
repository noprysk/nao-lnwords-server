const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    word: { type: String, required: true },
    translation: { type: String, required: true },
    group_id: { type: String, required: true },
    details: { type: String, default: null },
});

module.exports = mongoose.model("word", wordSchema);