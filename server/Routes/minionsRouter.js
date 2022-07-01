const express = require("express");
const app = express();
let { getAllFromDatabase } = require("../db");

const minionsRouter = express.Router();

minionsRouter.get("/", (req, res, next) => {
  const minionsArray = getAllFromDatabase("minions");
  if (minionsArray) {
    res.send(minionsArray);
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
