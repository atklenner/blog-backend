const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: String,
  body: String,
  date: { type: Date, default: new Date() },
  blogPost: { type: Schema.Types.ObjectId, required: true },
});

commentSchema.virtual("url").get(() => {
  return "/blog/" + this.blogPost + "/comments/" + this._id;
});

module.exports = mongoose.model("Comment", commentSchema);
