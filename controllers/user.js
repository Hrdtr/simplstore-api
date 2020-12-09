require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "accesstokensecret";
const bcrypt = require("bcrypt");
const dt = require("../utils");

module.exports = {
  getAll(req, res) {
    const data = dt.get();
    const users = data.users.map((u) => {
      return {
        username: u.username,
        role: u.role,
      };
    });
    res.send(users);
  },

  me(req, res) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        res.status(200).send({ user: user });
      });
    } else {
      res.sendStatus(401);
    }
  },

  get(req, res) {
    const data = dt.get();
    const findExist = data.users.find(
      (d) => d.username === req.params.username
    );
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "User not exist" });
    }
    const filteredData = data.users.filter(
      (d) => d.username === req.params.username
    )[0];
    const user = {
      username: filteredData.username,
      role: filteredData.role,
    };
    res.send(user);
  },

  add(req, res) {
    const data = dt.get();
    if (req.body.username == null || req.body.password == null) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const findExist = data.users.find((d) => d.username === req.body.username);
    if (findExist) {
      return res
        .status(409)
        .send({ error: true, msg: "Username already exist" });
    }
    const user = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role,
    };
    data.users.push(user);
    dt.save(data);
    res.send({ success: true, msg: "User added successfully" });
  },

  update(req, res) {
    if (req.body.username == null || req.body.password == null) {
      return res
        .status(406)
        .send({ error: true, msg: "(Some) Required data missing" });
    }
    const data = dt.get();
    const findExist = data.users.find(
      (d) => d.username === req.params.username
    );
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "User not exist" });
    }
    const password = data.users.filter(
      (d) => d.username === req.params.username
    )[0].password;
    if (bcrypt.compareSync(req.body.password, password)) {
      const filteredData = data.users.filter(
        (d) => d.username !== req.params.username
      );
      const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
      };
      filteredData.push(user);
      const dataUpdated = {
        ...data,
        users: filteredData,
      };
      dt.save(dataUpdated);
      res.send({ success: true, msg: "User data updated successfully" });
    } else {
      res.status(401).send({ error: true, msg: "Incorrect password" });
    }
  },

  del(req, res) {
    const data = dt.get();
    const findExist = data.users.find(
      (d) => d.username === req.params.username
    );
    if (!findExist) {
      return res.status(404).send({ error: true, msg: "User not exist" });
    }
    const filteredData = data.users.filter(
      (d) => d.username !== req.params.username
    );
    const dataUpdated = {
      ...data,
      users: filteredData,
    };
    dt.save(dataUpdated);
    res.send({ success: true, msg: "Data removed successfully" });
  },
};
