const express = require("express");
const apiRouter = express.Router();

apiRouter.use(express.static("public"));

const minionsRouter = require("./Routes/minionsRouter");
apiRouter.use("/minions/", minionsRouter);

const ideasRouter = require("./Routes/ideasRouter");
apiRouter.use("/ideas/", ideasRouter);

const meetingsRouter = require("./Routes/meetingsRouter");
apiRouter.use("/meetings", meetingsRouter);

module.exports = apiRouter;
