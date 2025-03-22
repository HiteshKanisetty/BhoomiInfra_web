const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admin");
const auth = require("../middleware/auth");

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
router.get("/bussiness-associate", admincontroller.getselectedba);
router.get("/edit/:id", admincontroller.getedit);
router.post("/edit-gm", admincontroller.postgmedit);
router.post("/edit-ba", admincontroller.postbaedit);
router.get("/view-ba", admincontroller.getbadata);
router.post("/delete-gm", admincontroller.postgmdelete);
router.post("/delete-ba", admincontroller.postbadelete);
router.post("/add-layout", admincontroller.postaddlayout);

module.exports = router;
