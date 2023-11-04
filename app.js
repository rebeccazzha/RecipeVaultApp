import express from "express";
import path, { dirname }  from "path";
import cookieParser from"cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import { fileURLToPath  } from "url";
import dataRouter from "./db/MyDB.js";

//ES6 modules don't have __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));
app.use("/", indexRouter);
app.use("/data", dataRouter);
 


export default app;
