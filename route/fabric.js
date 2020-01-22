const express = require("express");
const router = express.Router();
const fabricController = require("../controller/fabrics.controller");
const multer = require("../middleware/multer");

router.get("/", fabricController.getFabric);
router.get("/category", fabricController.getCategoryList);
router.get("/category/:category", fabricController.getCategory);
router.get("/", fabricController.getOneFabric);
router.post("/", multer.fabric, fabricController.postFabric);

module.exports = router;
