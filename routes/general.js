const express = require("express");
const router = express.Router();
const generalcontroller = require("../controllers/general");

router.post("/General-manager", generalcontroller.getgminterface);
router.get("/General-manager/ass", generalcontroller.getgm);
router.post(
  "/General-manager/associates/:paramid",
  generalcontroller.getassociates
);
router.get("/upload-doc", generalcontroller.getdocform);
router.post("/uploaddocs-post", generalcontroller.postdoc);
router.get("/get-docs", generalcontroller.getdocuments);

module.exports = router;
