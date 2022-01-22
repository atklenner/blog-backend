const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: String,
  author: String,
  date: { type: Date, default: Date.now() },
  body: String,
  published: { type: Boolean, default: false },
  tags: [{ type: String }],
});

blogPostSchema.virtual("url").get(() => {
  return "/blog/" + this._id;
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
