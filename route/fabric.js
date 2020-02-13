const express = require("express");
const router = express.Router();
const fabricController = require("../controller/fabrics.controller");
const auth = require("../middleware/auth");

router.get("/", fabricController.getFabric);
router.get("/category", fabricController.getCategoryList);
router.get("/category/:category", fabricController.getCategory);
router.get("/search", fabricController.getSearchList);
router.get("/:id", fabricController.getOneFabric);
router.post("/", auth, fabricController.postFabric);
router.put("/:id", auth, fabricController.editFabric);
router.delete("/:id", auth, fabricController.deleteFabric);

module.exports = router;
