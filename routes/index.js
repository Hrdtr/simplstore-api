const express = require("express");
const router = express.Router();

const root = require("./root");
const product = require("./product");
const user = require("./user");
const auth = require("./auth");
const img = require("./img");
const store = require("./store");
const carousel = require("./carousel");
const help = require("./help");
const socmed = require("./socmed");
const sitePreference = require("./sitePreference");

router.use("/", root);
router.use("/product", product);
router.use("/user", user);
router.use("/auth", auth);
router.use("/img", img);
router.use("/store", store);
router.use("/carousel", carousel);
router.use("/help", help);
router.use("/socmed", socmed);
router.use("/site-preference", sitePreference);

module.exports = router;
