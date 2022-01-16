import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

//@ts-ignore
import React from "react";
import ReactDOMServer from "react-dom/server";

//@ts-ignore
import App from "./frontend/src/App";

const app = express();

//@ts-ignore
app.get("/", (req, res, next) => {
  //@ts-ignore
  const app = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve("./frontend/build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.log("Something went wrong: ", err);
      return res.status(500).send("Failed");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use(express.static("./frontend/build"));

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
