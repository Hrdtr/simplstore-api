const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { getAll, me, get, add, update, del } = require("../controllers/user");

router.get("/", auth("superadmin"), getAll);
router.get("/me", auth(), me);
router.get("/:username", auth("superadmin"), get);
router.post("/", auth("superadmin"), add);
router.patch("/:username", auth("superadmin"), update);
router.delete("/:username", auth("superadmin"), del);

module.exports = router;
