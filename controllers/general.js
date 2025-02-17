const Gmmodel = require("../models/gmmodel");
const Bussmodel = require("../models/bussmodel");
exports.getgminterface = (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  if (password === "webcap") {
    Gmmodel.findOne({ employeeid: id }).then((data) => {
      res.render("general-manager/gminterface.ejs", { employee: data });
    });
  }
};
exports.getgm = (req, res, next) => {
  const id = req.query.id;
  Gmmodel.findOne({ _id: id }).then((data) => {
    res.render("general-manager/gminterface.ejs", { employee: data });
  });
};
exports.getassociates = (req, res, next) => {
  const id = req.query.id;
  const paramid = req.params.paramid;
  Bussmodel.find({ guidance: id }).then((data) => {
    res.render("general-manager/associates.ejs", {
      associates: data,
      qid: id,
      param: paramid,
    });
  });
};
exports.getdocform = (req, res, next) => {
  const id = req.query.id;
  Gmmodel.findOne({ _id: id }).then((data) => {
    res.render("general-manager/doc.ejs", { employee: data });
  });
};

exports.postdoc = (req, res, next) => {
  const image = req.file;
  const imageurl = image.path;
  const id = req.body.id;
  Gmmodel.findOneAndUpdate(
    { _id: id },
    { $push: { uploaddocs: { doc: imageurl } } },
    { new: true }
  ).then((result) => {
    console.log("Associates Updated");
    res.redirect(`/general-manager/ass?id=${id}`);
  });
};

exports.getdocuments = async (req, res, next) => {
  const id = req.query.id;
  Gmmodel.findOne({ _id: id }).then((result) => {
    res.json({ docs: result.uploaddocs });
  });
};
