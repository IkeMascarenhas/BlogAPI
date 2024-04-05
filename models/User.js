const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, min: 3 },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 10,
  },
  password: { type: String, required: true },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  AuthorOf:[]
});

module.exports = mongoose.model("User", User)