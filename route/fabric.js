const express = require("express");
const router = express.Router();
const fabricController = require("../controller/fabrics.controller");
const multer = require("../middleware/multer");

router.get("/", fabricController.getFabric);
router.get("/category", fabricController.getCategoryList);
router.get("/category/:category", fabricController.getCategory);
router.get("/:id", fabricController.getOneFabric);
router.post("/", multer.fabric, fabricController.postFabric);
router.put("/:id", fabricController.editFabric);
router.delete("/:id", fabricController.deleteFabric);

module.exports = router;
