const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} = require("./config/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

const indexRouter = require("./routes/index");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/", indexRouter);
app.use("/", (req, res) => {
  res.send("<h1>Docker is weird man<h1>");
});

const port = process.env.PORT || 3000;
app.listen(port);
