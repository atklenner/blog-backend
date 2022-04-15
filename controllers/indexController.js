const BlogPost = require("../models/blogPost");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const { get } = require("mongoose");

exports.getAllBlogs = (req, res, next) => {
  BlogPost.find()
    .sort({ date: -1 })
    .exec((err, blogPosts) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(blogPosts);
    });
};

exports.getBlogPost = [
  getBlog,
  (req, res, next) => {
    res.json(res.blogPost);
  },
];

// didn't finish this one, have to add tags
exports.postNewBlog = [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("body", "Body must not be empty.").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const blogPost = new BlogPost({
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
    });
    try {
      const newBlogPost = await blogPost.save();
      res.status(201).json(newBlogPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

exports.updateBlogPost = [
  getBlog,
  async (req, res, next) => {
    if (req.body.title != null) {
      res.blogPost.title = req.body.title;
    }
    if (req.body.author != null) {
      res.blogPost.author = req.body.author;
    }
    if (req.body.body != null) {
      res.blogPost.body = req.body.body;
    }
    try {
      const updatedBlog = await res.blogPost.save();
      res.json(updatedBlog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

exports.deleteBlogPost = [
  getBlog,
  async (req, res, next) => {
    try {
      await Comment.deleteMany({ blogPost: req.params.id });
      await res.blogPost.remove();
      res.json({ message: "Deleted Blog Post" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

exports.getBlogPostComments = [
  getBlog,
  (req, res, next) => {
    Comment.find({ blogPost: req.params.id })
      .sort({ date: -1 })
      .exec((err, comments) => {
        if (err) {
          return next(err);
        }
        res.json(comments);
      });
  },
];

exports.postNewBlogPostComment = [
  getBlog,
  body("author").trim().isLength({ min: 1 }).escape(),
  body("body").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const comment = new Comment({
      author: req.body.author,
      body: req.body.body,
      blogPost: req.params.id,
    });
    try {
      const newComment = await comment.save();
      res.status(201).json(newComment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

exports.getComment = [
  getBlog,
  getComment,
  (req, res, next) => {
    res.json(res.comment);
  },
];

exports.updateComment = [
  getBlog,
  body("author").trim().isLength({ min: 1 }).escape(),
  body("body").trim().isLength({ min: 1 }).escape(),
  getComment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    if (req.body.author != null) {
      res.comment.author = req.body.author;
    }
    if (req.body.body != null) {
      res.comment.body = req.body.body;
    }
    try {
      const updatedComment = await res.comment.save();
      res.json(updatedComment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

exports.deleteComment = [
  getBlog,
  getComment,
  async (req, res, next) => {
    try {
      await res.comment.remove();
      res.json({ message: "Deleted Comment" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

async function getBlog(req, res, next) {
  let blogPost;
  try {
    blogPost = await BlogPost.findById(req.params.id);
    if (blogPost === null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.blogPost = blogPost;
  next();
}

async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.findById(req.params.id2);
    if (comment == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.comment = comment;
  next();
}
