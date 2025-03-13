const Gmmodel = require("../models/gmmodel");
const Bussmodel = require("../models/bussmodel");
exports.getbainterface = (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  if (password === "webcap") {
    Bussmodel.findOne({ employeeid: id }).then((data) => {
      res.render("business-associate/bminterface.ejs", {
        employee: data,
      });
    });
  }
};
exports.getdocformba = (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  Bussmodel.findOne({ _id: id }).then((data) => {
    console.log(data);
    res.render("business-associate/doc.ejs", {
      employee: data,
      type: "Business-associate",
    });
  });
};
exports.getba = (req, res, next) => {
  const id = req.query.id;
  Bussmodel.findOne({ _id: id }).then((data) => {
    res.render("business-associate/bminterface.ejs", {
      employee: data,
      associate: false,
    });
  });
};
exports.postdocument = (req, res, next) => {
  const image = req.file;
  const imageurl = req.filePath;
  const id = req.body.id;
  Bussmodel.findOneAndUpdate(
    { _id: id },
    { $push: { uploaddocs: { doc: imageurl } } },
    { new: true }
  ).then((result) => {
    console.log("Associates Updated");
    res.redirect(`/business-associate/ass?id=${id}`);
  });
};

exports.getdocuments = async (req, res, next) => {
  const id = req.query.id;
  Bussmodel.findOne({ _id: id }).then((result) => {
    res.json({ docs: result.uploaddocs });
  });
};
