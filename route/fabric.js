const express = require("express");
const router = express.Router();
const fabricController = require("../controller/fabrics.controller");

router.get("/", fabricController.getFabric);
router.get("/", fabricController.getOneFabric);
router.post("/", fabricController.postFabric);

module.exports = router;
