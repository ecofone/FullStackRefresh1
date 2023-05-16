import express from "express";

import sampleData from "../contests-sample-data.json";

const apiRouter = express.Router();

apiRouter.get("/contest", (req, res) => {
  res.send(sampleData);
});

export default apiRouter;
