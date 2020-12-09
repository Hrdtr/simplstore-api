const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { get, add, update, del } = require("../controllers/socmed");

router.get("/", get);
router.post("/", auth(), add);
router.patch("/:name", auth(), update);
router.delete("/:name", auth(), del);

module.exports = router;
