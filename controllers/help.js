const dt = require("../utils");

module.exports = {
  get(req, res) {
    const data = dt.get();
    res.send(data.help);
  },

  update(req, res) {
    const data = dt.get();
    if (req.body.title == null || req.body.content == null) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const dataUpdated = {
      ...data,
      help: req.body,
    };
    dt.save(dataUpdated);
    res.send({
      success: true,
      msg: "Help data updated successfully",
      help: req.body,
    });
  },
};
