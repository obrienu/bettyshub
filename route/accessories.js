const express = require("express");
const router = express.Router();
const accessoriesController = require("../controller/accessories.controller");
const auth = require("../middleware/auth");

router.get("/", accessoriesController.getAccessories);
router.get("/category", accessoriesController.getCategoryList);
router.get("/category/:category", accessoriesController.getCategory);
router.get("/search", accessoriesController.getSearchList);
router.get("/:id", accessoriesController.getOneAccessories);
router.post("/", auth, accessoriesController.postAccessories);
router.put("/:id", auth, accessoriesController.editAccessoreis);
router.delete("/:id", auth, accessoriesController.deleteAccessories);

module.exports = router;
