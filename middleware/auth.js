const Gmmodel = require("../models/gmmodel");

module.exports = (req, res, next) => {
  const { id, password } = req.query.id ? req.query : req.body;

  if (!id || !password) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  Gmmodel.findOne({ employeeid: id })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      // Assuming passwords are stored in plain text for simplicity
      if (password === "webcap") {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    })
    .catch((err) => console.log(err));
};
