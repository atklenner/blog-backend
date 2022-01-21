const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

router.get("/", (req, res, next) => {
  res.redirect("/blog");
});

router.get("/blog", indexController.getAllBlogs);

router.post("/blog", indexController.postNewBlog);

router.get("/blog/:id", indexController.getBlogPost);

router.patch("/blog/:id", indexController.updateBlogPost);

router.delete("/blog/:id", indexController.deleteBlogPost);

router.get("/blog/:id/comments", indexController.getBlogPostComments);

router.post("/blog/:id/comments", indexController.postNewBlogPostComment);

router.get("/blog/:id/comments/:id", indexController.getComment);

router.patch("/blog/:id/comments/:id", indexController.updateComment);

router.delete("/blog/:id/comments/:id", indexController.deleteComment);

module.exports = router;
