require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "accesstokensecret";
const bcrypt = require("bcrypt");
const dt = require("../utils");

module.exports = {
  login(req, res) {
    const data = dt.get();
    const user = data.users.filter((u) => u.username === req.body.username)[0];
    if (!user) {
      {
        res.send("User not found");
      }
    } else if (bcrypt.compareSync(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        accessTokenSecret
      );
      res.json({
        success: true,
        accessToken,
      });
    } else {
      res.send("Username or password incorrect");
    }
  },
};
