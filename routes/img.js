const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const auth = require("../middlewares/auth");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var uploadImg = multer({
  storage: diskStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const { upload, list } = require("../controllers/img");

router.use("/", express.static(path.join(__dirname, "..", "images")));
router.post("/upload", [auth(), uploadImg.array("files", 5)], upload);
router.get("/list", auth(), list);

module.exports = router;
