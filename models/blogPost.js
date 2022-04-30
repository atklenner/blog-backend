const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: String,
  author: String,
  date: { type: Date, default: new Date() },
  body: String,
  published: { type: Boolean, default: false },
  tags: [{ type: String }],
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
