const express = require("express");
const router = express.Router();
const accessoriesController = require("../controller/accessories.controller");
const multer = require("../middleware/multer");

router.get("/", accessoriesController.getAccessories);
router.get("/:id", accessoriesController.getOneAccessories);
router.get("/category", accessoriesController.getCategoryList);
router.get("/category/:category", accessoriesController.getCategory);
router.post("/", multer.accessories, accessoriesController.postAccessories);

module.exports = router;
