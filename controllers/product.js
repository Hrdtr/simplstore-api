const dt = require("../utils");

module.exports = {
  getAll(req, res) {
    const data = dt.get();
    res.send(data.products);
  },

  get(req, res) {
    const data = dt.get();
    const findExist = data.products.find((d) => d.code === req.params.code);
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "Product not exist" });
    }
    const filteredData = data.products.filter(
      (d) => d.code === req.params.code
    )[0];
    res.send(filteredData);
  },

  add(req, res) {
    const data = dt.get();
    if (
      req.body.code == null ||
      req.body.name == null ||
      req.body.photos == null ||
      req.body.category == null ||
      req.body.description == null ||
      req.body.price == null
    ) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const findExist = data.products.find((d) => d.code === req.body.code);
    if (findExist) {
      return res.status(409).send({
        error: true,
        msg: "Product code already exist",
      });
    }
    data.products.push(req.body);
    dt.save(data);
    res.send({
      success: true,
      msg: "Product data added successfully",
      product: req.body,
    });
  },

  update(req, res) {
    const data = dt.get();
    if (
      req.body.code == null ||
      req.body.name == null ||
      req.body.photos == null ||
      req.body.category == null ||
      req.body.description == null ||
      req.body.price == null
    ) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const findExist = data.products.find((d) => d.code === req.params.code);
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "Product not exist" });
    }
    const filteredData = data.products.filter(
      (d) => d.code !== req.params.code
    );
    filteredData.push(req.body);
    const dataUpdated = {
      ...data,
      products: filteredData,
    };
    dt.save(dataUpdated);
    res.send({
      success: true,
      msg: "Product data updated successfully",
      product: req.body,
    });
  },

  del(req, res) {
    const data = dt.get();
    const findExist = data.products.find((d) => d.code === req.params.code);
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "Product not exist" });
    }
    const filteredData = data.products.filter(
      (d) => d.code !== req.params.code
    );
    const dataUpdated = {
      ...data,
      products: filteredData,
    };
    dt.save(dataUpdated);
    res.send({ success: true, msg: "Data removed successfully" });
  },
};
