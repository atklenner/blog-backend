const Admin = require("../models/admin");
const BlogPost = require("../models/blogPost");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SESSION_SECRET } = require("../config/config");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userAlreadyExists = await Admin.findOne({ email });
    if (userAlreadyExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Admin.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      SESSION_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await Admin.findOne({ email });
    if (!userExists)
      return res.status(400).json({ message: "User does not exist" });

    const correctPassword = await bcrypt.compare(password, userExists.password);

    if (correctPassword) {
      const token = jwt.sign(
        { email: userExists.email, id: userExists._id },
        SESSION_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ result: userExists, token });
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.render("index", { posts });
  } catch (error) {
    res.render("404");
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    res.render("post", { post });
  } catch (error) {
    res.render("404");
  }
};
