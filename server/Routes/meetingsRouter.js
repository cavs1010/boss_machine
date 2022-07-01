const express = require("express");
const app = express();
let { getAllFromDatabase } = require("../db");

const meetingsRouter = express.Router();

meetingsRouter.get("/", (req, res, next) => {
  const meetingsArray = getAllFromDatabase("meetings");
  if (meetingsArray) {
    res.send(meetingsArray);
  } else {
    res.status(404).send();
  }
});

module.exports = meetingsRouter;
