import express from "express";
import { PORT, HOST, SERVER_URL } from "./config";
const server = express();

server.use(express.static("dist"));

server.set("view engine", "ejs");

server.use("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, HOST, () => {
  console.info(`express server is listening at ${SERVER_URL}`);
});
