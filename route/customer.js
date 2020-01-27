const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer.controller");

router.post("/", customerController.postCustomer);

module.exports = router;
