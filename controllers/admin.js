const Gmmodel = require("../models/gmmodel");
const Bussmodel = require("../models/bussmodel");

exports.getlogin = (req, res, next) => {
  res.render("login/login.ejs", {
    pageTitle: "Login",
  });
};
exports.getbmlogin = (req, res, next) => {
  res.render("login/bmlogin.ejs", {
    pageTitle: "Login",
  });
};
exports.postbmlogin = (req, res, next) => {
  const id = req.body.userid;
  const password = req.body.password;
  if (id == "1234" && password == "bir") {
    res.render("board-manager/bminterface.ejs", {
      pageTitle: "Login",
    });
  }
};
exports.getbminterface = (req, res, next) => {
  res.render("board-manager/bminterface.ejs", {
    pageTitle: "Login",
  });
};
exports.getform = (req, res, next) => {
  res.render("board-manager/reg-form.ejs", {
    pageTitle: "Login",
  });
};
exports.postformgm = (req, res, next) => {
  const {
    firstname,
    lastname,
    mobile,
    age,
    gender,
    employeeid,
    layoutname,
    plotssold,
  } = req.body;
  const image = req.file;
  Gmmodel.find({ employeeid: employeeid }).then((result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "User Already Exists" });
    } else {
      const imageurl = image.path;
      const gmmodel = new Gmmodel({
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        age: age,
        gender: gender,
        employeeid: employeeid,
        layoutname: layoutname,
        plotssold: plotssold,
        image: imageurl,
      });
      gmmodel.save().then((result) => {
        console.log("User Created");
        res.redirect("/create-user");
      });
    }
  });
};
exports.postformba = (req, res, next) => {
  const {
    firstname,
    lastname,
    mobile,
    age,
    gender,
    employeeid,
    layoutname,
    plotssold,
    guidance,
  } = req.body;
  const image = req.file;
  Bussmodel.find({ employeeid: employeeid }).then((result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "User Already Exists" });
    } else {
      Gmmodel.findOneAndUpdate(
        { employeeid: guidance },
        { $push: { associates: { associate: employeeid } } },
        { new: true }
      ).then((result) => {
        console.log("Associates Updated");
      });
      const imageurl = image.path;
      const bussmodel = new Bussmodel({
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        age: age,
        gender: gender,
        employeeid: employeeid,
        layoutname: layoutname,
        plotssold: plotssold,
        guidance: guidance,
        image: imageurl,
      });
      bussmodel.save().then((result) => {
        console.log("User Created");
        res.redirect("/create-user");
      });
    }
  });
};

exports.getgmdata = (req, res, next) => {
  Gmmodel.find().then((result) => {
    res.render("board-manager/view-gm.ejs", {
      pageTitle: "Login",
      employees: result,
    });
  });
};
exports.getbm = async (req, res, next) => {
  const id = req.query.id;
  console.log("Query ID:", id);

  Bussmodel.find({ employeeid: id }).then((result) => {
    console.log(result);
    res.json({ products: result });
  });
};
// try {
//   // Find the teacher by ID and select only the tasks field
//   const teacher = await Teacher.findById(teacherId);

//   if (!teacher) {
//     return res.status(404).json({ message: "Teacher not found" });
//   }

//   // Return the tasks
//   res.json({ tasks: teacher.tasks });
// } catch (error) {
//   console.error("Error fetching tasks:", error);
//   res.status(500).json({ message: "Internal server error" });
// }

exports.getselectedgm = (req, res, next) => {
  const id = req.query.id;
  Gmmodel.findById({ _id: id }).then((data) => {
    res.render("board-manager/dispgm.ejs", {
      employee: data,
    });
  });
};
