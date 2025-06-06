const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const session = require("express-session");
const flash = require("connect-flash");
const Gmmodel = require("./models/gmmodel");
const Bussmodel = require("./models/bussmodel");
const adminroutes = require("./routes/board");
const gmroutes = require("./routes/general");
const agentroutes = require("./routes/agent");

const app = express();
const MONGODB_URI =
  "mongodb+srv://hiteshkanisetty:Hitu9866@cluster0.mglnz.mongodb.net/data?retryWrites=true&w=majority&appName=cluster-BIR";
const port = 3000;
app.set("view engine", "ejs");
app.set("views", "views");
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(
      __dirname,
      "images-form",
      new Date().toISOString().split("T")[0]
    );
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const datePath = new Date().toISOString().split("T")[0];
    const filename =
      new Date().toISOString().replace(/[-:]/g, "") + file.originalname;
    req.filePath = path.join("images-form", datePath, filename); // Store the relative path in req.filePath
    cb(null, filename);
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
// app.use(
//   session({
//     secret: "my secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }

//   const userId = req.session.user._id;
//   const userType = req.session.user.type;

//   if (userType === "gm") {
//     Gmmodel.findById(userId)
//       .then((user) => {
//         if (user) {
//           req.user = user;
//           return next();
//         }
//         return Bussmodel.findById(userId);
//       })
//       .then((user) => {
//         if (user) {
//           req.user = user;
//         }
//         next();
//       })
//       .catch((err) => console.log(err));
//   } else if (userType === "ba") {
//     Bussmodel.findById(userId)
//       .then((user) => {
//         if (user) {
//           req.user = user;
//           return next();
//         }
//         return Gmmodel.findById(userId);
//       })
//       .then((user) => {
//         if (user) {
//           req.user = user;
//         }
//         next();
//       })
//       .catch((err) => console.log(err));
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   next();
// });

app.use(flash());
app.use(adminroutes);
app.use(gmroutes);
app.use(agentroutes);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(port);
    console.log("Server started");
  })
  .catch((err) => console.log("err"));
