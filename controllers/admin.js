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
  const { firstname, lastname, mobile, age, gender, role, guidance } = req.body;
  const image = req.filePath;
  if (guidance) {
    Gmmodel.findOneAndUpdate(
      { employeeid: guidance },
      { $push: { associates: { associate: firstname } } },
      { new: true }
    ).then((result) => {
      console.log("Associates Updated");
    });
  }
  const imageurl = image.filePath;
  const gmmodel = new Gmmodel({
    firstname: firstname,
    lastname: lastname,
    mobile: mobile,
    age: age,
    gender: gender,
    role: role,
    guidance: guidance,
    image: image,
  });
  gmmodel.save().then((result) => {
    console.log("User Created");
    res.redirect("/create-user");
  });
};
exports.postformba = (req, res, next) => {
  const { firstname, lastname, mobile, age, gender, employeeid, guidance } =
    req.body;
  const image = req.filePath;
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

      const bussmodel = new Bussmodel({
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        age: age,
        gender: gender,
        employeeid: employeeid,
        guidance: guidance,
        image: image,
      });
      bussmodel.save().then((result) => {
        console.log("User Created");
        res.redirect("/create-user");
      });
    }
  });
};

exports.getgmdata = (req, res, next) => {
  setTimeout(() => {
    Gmmodel.find().then((result) => {
      res.render("board-manager/view-gm.ejs", {
        pageTitle: "Login",
        title: "General Managers",
        type: "general-manager",
        employees: result,
      });
    });
  }, 1000);
};
exports.getbadata = (req, res, next) => {
  setTimeout(() => {
    Bussmodel.find().then((result) => {
      res.render("board-manager/view-gm.ejs", {
        pageTitle: "Login",
        title: "Bussiness Associates",
        type: "bussiness-associate",
        employees: result,
      });
    });
  }, 1000);
};
// exports.getbm = async (req, res, next) => {
//   const id = req.query.id;
//   console.log("Query ID:", id);

//   Bussmodel.find({ employeeid: id }).then((result) => {
//     console.log(result);
//     res.json({ products: result });
//   });
// };
exports.getbm = async (req, res, next) => {
  const id = req.query.id;
  console.log("Query ID:", id);

  Bussmodel.find({ guidance: id }).then((result) => {
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
  setTimeout(() => {
    Gmmodel.findById({ _id: id }).then((data) => {
      res.render("board-manager/dispgm.ejs", {
        type: "gm",
        employee: data,
      });
    });
  }, 1000);
};
exports.getselectedba = (req, res, next) => {
  const id = req.query.id;
  setTimeout(() => {
    Bussmodel.findById({ _id: id }).then((data) => {
      res.render("board-manager/dispgm.ejs", {
        employee: data,
        type: "ba",
      });
    });
  }, 1000);
};
exports.postgmdelete = (req, res, next) => {
  const id = req.body.id;
  Gmmodel.deleteOne({ _id: id })
    .then((result) => {
      res.redirect("/view-gm");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
exports.postbadelete = (req, res, next) => {
  const id = req.body.id;
  Bussmodel.deleteOne({ _id: id })
    .then((result) => {
      res.redirect("/view-ba");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getedit = (req, res, next) => {
  const id = req.params.id;
  const type = req.query.type;

  if (type === "gm") {
    Gmmodel.findById(id)
      .then((data) => {
        res.render("board-manager/edit-data.ejs", {
          editing: true,
          gmdata: data,
          type: "gm",
        });
      })
      .catch((err) => console.log(err));
  } else if (type === "ba") {
    Bussmodel.findById(id)
      .then((data) => {
        res.render("board-manager/edit-data.ejs", {
          editing: true,
          gmdata: data,
          type: "ba",
        });
      })
      .catch((err) => console.log(err));
  }
};

exports.postgmedit = (req, res, next) => {
  const { id, firstname, lastname, mobile, age, gender, employeeid } = req.body;
  Gmmodel.findById(id)
    .then((gm) => {
      if (!gm) {
        return res.redirect("/view-gm");
      }
      gm.firstname = firstname;
      gm.lastname = lastname;
      gm.age = age;
      gm.mobile = mobile;
      gm.gender = gender;
      gm.employeeid = employeeid;

      return gm.save().then((result) => {
        console.log("updated product");
        res.redirect("/view-gm");
      });
    })
    .catch((err) => console.log(err));
};

exports.postbaedit = (req, res, next) => {
  const { id, firstname, lastname, mobile, age, gender, employeeid, guidance } =
    req.body;
  Bussmodel.findById(id)
    .then((ba) => {
      if (!ba) {
        return res.redirect("/view-ba");
      }
      ba.firstname = firstname;
      ba.lastname = lastname;
      ba.age = age;
      ba.mobile = mobile;
      ba.gender = gender;
      ba.employeeid = employeeid;
      ba.guidance = guidance;

      return ba.save().then((result) => {
        console.log("updated product");
        res.redirect("/view-ba");
      });
    })
    .catch((err) => console.log(err));
};
exports.postaddlayout = (req, res, next) => {
  const { id, type } = req.query;
  const { layoutName, plotsSold } = req.body;

  if (type === "gm") {
    Gmmodel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          layouts: {
            name: layoutName,
            plotsSold: plotsSold,
          },
        },
      },
      { new: true }
    )
      .then((result) => {
        res.redirect(`/general-manager?id=${id}`);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  } else if (type === "ba") {
    Bussmodel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          layouts: {
            name: layoutName,
            plotsSold: plotsSold,
          },
        },
      },
      { new: true }
    )
      .then((result) => {
        res.redirect(`/bussiness-associate?id=${id}`);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  }
};
