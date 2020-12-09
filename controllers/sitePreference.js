const dt = require("../utils");

module.exports = {
  get(req, res) {
    const data = dt.get();
    res.send(data.sitePreferences);
  },

  update(req, res) {
    const data = dt.get();
    if (req.body.title == null || req.body.icon == null) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const dataUpdated = {
      ...data,
      sitePreferences: req.body,
    };
    dt.save(dataUpdated);
    res.send({
      success: true,
      msg: "Site Preferences data updated successfully",
      sitePreferences: req.body,
    });
  },
};
