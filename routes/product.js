const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { getAll, get, add, update, del } = require("../controllers/product");

router.get("/", getAll);
router.get("/:code", get);
router.post("/", auth(), add);
router.patch("/:code", auth(), update);
router.delete("/:code", auth(), del);

module.exports = router;
