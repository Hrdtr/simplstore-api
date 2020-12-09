const dt = require("../utils");

module.exports = {
  get(req, res) {
    const data = dt.get();
    res.send(data.socmed);
  },

  add(req, res) {
    const data = dt.get();
    if (req.body.name == null || req.body.url == null) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const findExist = data.socmed.find((d) => d.name === req.body.name);
    if (findExist) {
      return res.status(409).send({
        error: true,
        msg: `Socmed with name ${req.body.name} already exist`,
      });
    }
    data.socmed.push(req.body);
    dt.save(data);
    res.send({
      success: true,
      msg: "Socmed data added successfully",
      item: req.body,
    });
  },

  update(req, res) {
    const data = dt.get();
    if (req.body.name == null || req.body.url == null) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const findExist = data.socmed.find((d) => d.name === req.params.name);
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "Socmed not exist" });
    }
    const filteredData = data.socmed.filter((d) => d.name !== req.params.name);
    filteredData.push(req.body);
    const dataUpdated = {
      ...data,
      socmed: filteredData,
    };
    dt.save(dataUpdated);
    res.send({
      success: true,
      msg: "Socmed data updated successfully",
      item: req.body,
    });
  },

  del(req, res) {
    const data = dt.get();
    const findExist = data.socmed.find((d) => d.name === req.params.name);
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "Socmed not exist" });
    }
    const filteredData = data.socmed.filter((d) => d.name !== req.params.name);
    const dataUpdated = {
      ...data,
      socmed: filteredData,
    };
    dt.save(dataUpdated);
    res.send({ success: true, msg: "Socmed deleted successfully" });
  },
};
