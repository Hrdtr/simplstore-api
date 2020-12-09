const dt = require("../utils");

module.exports = {
  get(req, res) {
    const data = dt.get();
    res.send(data.carousels);
  },

  add(req, res) {
    const data = dt.get();
    if (
      req.body.img == null ||
      req.body.text == null ||
      req.body.productCode == null
    ) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const findProduct = data.products.find(
      (d) => d.code === req.body.productCode
    );
    if (!findProduct) {
      return res.status(409).send({
        error: true,
        msg: "No product with code " + req.body.productCode,
      });
    }
    const findExist = data.carousels.find(
      (d) => d.productCode === req.body.productCode
    );
    if (findExist) {
      return res.status(409).send({
        error: true,
        msg: "Carousel which link to the product already exist",
      });
    }
    data.carousels.push(req.body);
    dt.save(data);
    res.send({
      success: true,
      msg: "Carousel data added successfully",
      carousel: req.body,
    });
  },

  update(req, res) {
    const data = dt.get();
    if (
      req.body.img == null ||
      req.body.text == null ||
      req.body.productCode == null
    ) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    // const findExist = data.carousels.find(
    //   (d) => d.productCode === req.body.productCode
    // );
    // if (findExist) {
    //   return res.status(409).send({
    //     error: true,
    //     msg: "Carousel which link to the product already exist",
    //   });
    // }
    const filteredData = data.carousels.filter(
      (d) => d.productCode !== req.params.productCode
    );
    filteredData.push(req.body);
    const dataUpdated = {
      ...data,
      carousels: filteredData,
    };
    dt.save(dataUpdated);
    res.send({
      success: true,
      msg: "Carousel data updated successfully",
      carousel: req.body,
    });
  },

  del(req, res) {
    const data = dt.get();
    const findExist = data.carousels.find(
      (d) => d.productCode === req.params.productCode
    );
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "Carousel not exist" });
    }
    const filteredData = data.carousels.filter(
      (d) => d.productCode !== req.params.productCode
    );
    const dataUpdated = {
      ...data,
      carousels: filteredData,
    };
    dt.save(dataUpdated);
    res.send({ success: true, msg: "Carousel deleted successfully" });
  },
};
