import express from "express";
import cors from "cors";

import { connectClient } from "./db";

const apiRouter = express.Router();
apiRouter.use(cors());

apiRouter.get("/contest", async (req, res) => {
  const client = await connectClient();
  const contests = await client
    .collection("contests")
    .find()
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
      names: 1,
    })
    .toArray();
  res.send({ contests });
});

apiRouter.get("/contest/:contestId", async (req, res) => {
  const client = await connectClient();
  const contest = await client
    .collection("contests")
    .findOne({ id: req.params.contestId });
  res.send({ contest });
});

apiRouter.post("/contest/:contestId", async (req, res) => {
  const client = await connectClient();
  const { contestId } = req.params;
  const { newNameValue } = req.body;
  const doc = await client
    .collection<{}>("contests")
    .findOneAndUpdate(
      { id: contestId },
      {
        $push: {
          names: {
            id: newNameValue.toLowerCase().replace(/\s/g, "-"),
            name: newNameValue,
            timestamp: new Date(),
          },
        },
      },
      { returnDocument: "after" },
    );
  res.send({ updatedContest: doc.value });
});

export default apiRouter;
