const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { get, update } = require("../controllers/help");

router.get("/", get);
router.post("/", auth(), update);

module.exports = router;
