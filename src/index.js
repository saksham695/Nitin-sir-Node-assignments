const express = require("express");
const fs = require("fs");
const fileName = process.argv[2];
const path = require("path");
const alphabetCounter = require("./utils/alphabetCounter");
const app = express();

//Define paths for Express config
const viewsPath = path.join(__dirname, "./views");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

let show;
let fileData;
if (fileName) {
  fileData = fs.readFileSync(fileName).toString();
}

app.get("/", (req, res) => {
  res.send(`Go to this PATH : ${req.path}count `);
});

app.get(
  "/count",
  (req, res, next) => {
    if (fileData) {
      show = alphabetCounter(fileData);
      next();
    } else {
      res.render("file");
    }
  },
  (req, res) => {
    res.send(show);
  }
);

app.use((req, res, next) => {
  res.render("404");
});

app.use((error, req, res, next) => {
  res.render("500"); // Renders an error page to user!
});

app.listen(3002, () => {
  console.log("Server is up on port 3002");
});
