const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { get, add, update, del } = require("../controllers/carousel");

router.get("/", get);
router.post("/", auth(), add);
router.patch("/:productCode", auth(), update);
router.delete("/:productCode", auth(), del);

module.exports = router;
