const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");
const auth = require("../middleware/auth");

router.get("/", (req, res, next) => {
  res.redirect("/api/v1/blog");
});

router.get("/blog", indexController.getAllBlogs);

router.post("/blog", indexController.postNewBlog);

router.get("/blog/:id", indexController.getBlogPost);

router.patch("/blog/:id", indexController.updateBlogPost);

router.delete("/blog/:id", indexController.deleteBlogPost);

router.get("/blog/:id/comments", indexController.getBlogPostComments);

router.post("/blog/:id/comments", indexController.postNewBlogPostComment);

router.get("/blog/:id/comments/:id2", indexController.getComment);

router.patch("/blog/:id/comments/:id2", indexController.updateComment);

router.delete("/blog/:id/comments/:id2", indexController.deleteComment);

module.exports = router;
