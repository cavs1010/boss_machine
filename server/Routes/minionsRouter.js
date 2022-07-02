const express = require("express");
const app = express();
const errorhandler = require('errorhandler');
let { getAllFromDatabase, addToDatabase } = require("../db");

const minionsRouter = express.Router();

minionsRouter.get("/", (req, res, next) => {
  const minionsArray = getAllFromDatabase("minions");
  if (minionsArray) {
    res.send(minionsArray);
  } else {
    res.status(404).send();
  }
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

module.exports = minionsRouter;
