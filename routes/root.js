const express = require("express");
const router = express.Router();

const { get } = require("../controllers/root");

router.get("/", get);

module.exports = router;
