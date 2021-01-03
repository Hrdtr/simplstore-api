require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());

const routes = require("./routes");
app.use("/", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server runs on port ${process.env.PORT || "3000"}`);
});
