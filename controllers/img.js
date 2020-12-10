const dt = require("../utils");
const path = require("path");
const fs = require("fs");

function deleteImgFiles(files, callback) {
  var i = files.length;
  files.forEach(function (filepath) {
    fs.unlink(path.join(__dirname, "..", "images", filepath), function (err) {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}

module.exports = {
  // get(req,res) {},
  upload(req, res) {
    const files = req.files;
    if (!files) {
      res.status(400).send({
        success: 0,
        message: "No File is selected.",
      });
    }
    const data = dt.get();
    files.forEach((img) => data.images.push(img.filename));
    dt.save(data);
    res.status(200).send({
      success: true,
      filename: req.files.filename,
    });
  },

  deleteImg(req, res) {
    const files = req.body;
    if (!files) {
      res.status(400).send({
        success: 0,
        message: "No File is selected.",
      });
    }
    const data = dt.get();
    files.forEach((img) => data.images.splice(data.images.indexOf(img), 1));
    deleteImgFiles(files, (err) => {
      if (err) {
        console.log(err);
      }
    });
    dt.save(data);
    res.status(200).send({
      success: true,
      filename: "File(s) deleted",
    });
  },

  list(req, res) {
    const data = dt.get();
    res.send(data.images);
  },
};
