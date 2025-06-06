const express = require("express");
const router = express.Router();
const bussmodel = require("../controllers/agent");

router.post("/Business-associate", bussmodel.getbainterface);
router.get("/uploadeddoc-doc", bussmodel.getdocformba);
router.get("/Business-associate/ass", bussmodel.getba);
router.post("/upload-post", bussmodel.postdocument);
router.get("/get-docs", bussmodel.getdocuments);
router.delete("/delete-doc-ba", bussmodel.docdelete);

module.exports = router;
