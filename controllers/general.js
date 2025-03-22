const Gmmodel = require("../models/gmmodel");
const Bussmodel = require("../models/bussmodel");
const fs = require("fs");
const path = require("path");
exports.getgminterface = (req, res, next) => {
  const { id, password } = req.body;

  Gmmodel.findOne({ employeeid: id })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      // Assuming passwords are stored in plain text for simplicity
      if (password === "webcap") {
        res.render("general-manager/gminterface.ejs", {
          employee: user,
          associate: true,
          isAuthenticated: true,
        });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    })
    .catch((err) => console.log(err));
};
exports.getgm = (req, res, next) => {
  const id = req.query.id;
  Gmmodel.findOne({ _id: id }).then((data) => {
    res.render("general-manager/gminterface.ejs", {
      employee: data,
      associate: true,
      isAuthenticated: true,
    });
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
      isAuthenticated: true,
    });
  });
};
exports.getdocform = (req, res, next) => {
  const id = req.query.id;
  Gmmodel.findOne({ _id: id }).then((data) => {
    res.render("general-manager/doc.ejs", {
      employee: data,
      type: "General-manager",
      isAuthenticated: true,
    });
  });
};

exports.postdoc = (req, res, next) => {
  const image = req.file;
  const imageurl = req.filePath;

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

exports.docdelete = async (req, res) => {
  const { id, docId } = req.query;

  try {
    const user = await Gmmodel.findOne({ _id: id });
    const doc = user.uploaddocs.id(docId);

    if (doc) {
      const imagePath = path.join(__dirname, "..", doc.doc);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image file: ${err}`);
          return res.json({ success: false });
        }

        Gmmodel.updateOne(
          { _id: id },
          { $pull: { uploaddocs: { _id: docId } } }
        )
          .then(() => {
            res.json({ success: true });
          })
          .catch((error) => {
            console.error(error);
            res.json({ success: false });
          });
      });
    } else {
      res.json({ success: false, message: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};
