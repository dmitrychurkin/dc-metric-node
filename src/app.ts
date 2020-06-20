import "./util/env-var";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import lusca from "lusca";

import webRoutes from "./routes/web";
import apiRoutes from "./routes/api";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", webRoutes);
app.use("/api", apiRoutes);

export default app;
