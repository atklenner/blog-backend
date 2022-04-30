const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("signin");
});

router.post("/", adminController.signin);

router.get("/signup", (req, res) => {
  res.render("singup");
});

router.post("/signup", adminController.signup);

router.get("/index", adminController.getPosts);

router.get("/new", (req, res) => {
  res.render("post");
});

router.get("/:id", adminController.getPost);

module.exports = router;
