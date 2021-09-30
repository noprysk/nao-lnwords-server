const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    user_email: { type: String,  required: true },
});

module.exports = mongoose.model("group", groupSchema);