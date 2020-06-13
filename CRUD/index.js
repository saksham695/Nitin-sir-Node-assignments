const express = require("express");
const app = express();
const Routers = require("./routes");
const dbLog = require("./dblog");
const log = require("./logger");
app.use(express.json());

app.use(log);

app.use(dbLog);

app.use("/api/trainees", Routers);

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
