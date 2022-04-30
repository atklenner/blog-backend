const { SESSION_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, SESSION_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = auth;
