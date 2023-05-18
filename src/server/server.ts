import express from "express";
import { PORT, HOST, SERVER_URL } from "./config";
import apiRouter from "./api-router";
import serverRender from "./render";
const server = express();

server.use(express.static("dist"));
server.use(express.json());

server.set("view engine", "ejs");

server.use("/api", apiRouter);

server.use(["/contest/:contestId", "/"], async (req, res) => {
  const { initialHTML, initialData } = await serverRender(req);
  res.render("index", {
    initialHTML,
    initialData,
  });
});

server.listen(PORT, HOST, () => {
  console.info(`express server is listening at ${SERVER_URL}`);
});
