const express = require("express");
const router = express.Router();
const richController = require("../controller/rich");
const multer = require("../middleware/multer");

router.get("/", richController.getProduct);
router.get("/preview", richController.getPreview);
router.get("/:id", richController.getSingleProduct);
router.post("/", multer.rich, richController.postProduct);

module.exports = router;
