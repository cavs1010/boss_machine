const express = require("express");
const app = express();
const errorhandler = require("errorhandler");
let {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  isValidMinion,
  deleteFromDatabasebyId,
} = require("../db");

const minionsRouter = express.Router();

// ---- VALIDATION MIDLLEWARES ---
const getMinions = (req, res, next) => {
  req.minionsArray = getAllFromDatabase("minions");
  next();
};

const findMinion = (req, res, next) => {
  const minionRequired = req.minionsArray.find(
    (x) => x.id === req.params.minionId
  );
  if (minionRequired) {
    req.minionRequired = minionRequired;
  } else {
    return res.status(404).send("Minion was not found");
  }
  next();
};

// ---- HANDLING REQUESTS ---
minionsRouter.get("/", getMinions, (req, res, next) => {
  if (req.minionsArray) {
    res.send(req.minionsArray);
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/:minionId", getMinions, findMinion, (req, res, next) => {
  res.send(req.minionRequired);
});

minionsRouter.post("/", (req, res, next) => {
  if (isValidMinion(req.body)) {
    const newMinion = addToDatabase("minions", req.body);
    res.status(201).send(newMinion);
  } else {
    return res.status(417).send("Something wrong");
  }
});

minionsRouter.put("/:minionId", getMinions, findMinion, (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinion);
});

minionsRouter.delete("/:minionId", getMinions, findMinion, (req, res, next) => {
  deleteFromDatabasebyId("minions", req.minionRequired.id);
  res.status(204).send(req.minionRequired.id);
});

minionsRouter.use(errorhandler);

module.exports = minionsRouter;
