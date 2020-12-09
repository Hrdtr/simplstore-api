const dt = require("../utils");

module.exports = {
  get(req, res) {
    const data = dt.get();
    res.send(data.store);
  },

  update(req, res) {
    const data = dt.get();
    if (
      req.body.name == null ||
      req.body.description == null ||
      req.body.about == null ||
      req.body.whatsapp == null
    ) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const dataUpdated = {
      ...data,
      store: req.body,
    };
    dt.save(dataUpdated);
    res.send({
      success: true,
      msg: "Store data updated successfully",
      store: req.body,
    });
  },
};
