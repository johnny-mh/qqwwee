import express from "express";
import jsonServer from "json-server";
import { join, resolve } from "path";

const app = express();

app.use("/api", [
  jsonServer.defaults(),
  jsonServer.bodyParser,
  jsonServer.router(join(resolve(), "db.json")),
]);

export const handler = app;
