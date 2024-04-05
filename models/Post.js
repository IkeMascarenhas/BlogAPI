const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  info: {
    likes: {
      type: Number,
      default: 0,
    },
    comments: { type: Array, default: [] },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
  },
});

module.exports = mongoose.model("Post", Post);
