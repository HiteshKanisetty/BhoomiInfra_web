const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const adminroutes = require("./routes/board");
const gmroutes = require("./routes/board");
const agentroutes = require("./routes/general");

const app = express();
const MONGODB_URI =
  "mongodb+srv://hiteshkanisetty:Hitu9866@cluster0.mglnz.mongodb.net/data?retryWrites=true&w=majority&appName=cluster-BIR";
const port = 3000;
app.set("view engine", "ejs");
app.set("views", "views");
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images-form");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/\-/g, "").replace(/\:/g, "") +
        file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyparser.urlencoded({ extended: false }));
app.use(
  multer({ storage: filestorage, fileFilter: filefilter }).single("image")
);
app.use(express.static(path.join(__dirname, "style")));
app.use(express.static(path.join(__dirname, "images")));
app.use("/images-form", express.static(path.join(__dirname, "images-form")));
app.use(express.static(path.join(__dirname, "js")));

app.use(adminroutes);
// app.use(gmroutes);
// app.use(agentroutes);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(port);
    console.log("Server started");
  })
  .catch((err) => console.log("err"));
