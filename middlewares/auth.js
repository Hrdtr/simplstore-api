require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "accesstokensecret";

module.exports = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        if (typeof role !== "undefined" && role !== user.role) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
};
