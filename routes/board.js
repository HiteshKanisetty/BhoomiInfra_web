const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admin");

router.get("/", admincontroller.getlogin);
router.get("/bm-login", admincontroller.getbmlogin);
router.get("/bm-login-post", admincontroller.getbminterface);
router.post("/bm-login-post", admincontroller.postbmlogin);
router.get("/create-user", admincontroller.getform);
router.post("/create-user-gm", admincontroller.postformgm);
router.post("/create-user-ba", admincontroller.postformba);
router.get("/view-gm", admincontroller.getgmdata);
router.get("/gm", admincontroller.getbm);
router.get("/general-manager", admincontroller.getselectedgm);

module.exports = router;
