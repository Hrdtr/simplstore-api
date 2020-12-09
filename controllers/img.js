const dt = require("../utils");

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

  list(req, res) {
    const data = dt.get();
    res.send(data.images);
  },
};
