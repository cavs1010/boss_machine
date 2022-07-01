const express = require("express");
const app = express();
let { getAllFromDatabase } = require("../db");

const ideasRouter = express.Router();

ideasRouter.get("/", (req, res, next) => {
  const ideasArray = getAllFromDatabase("ideas");
  if (ideasArray) {
    res.send(ideasArray);
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
