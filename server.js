const express = require("express");
const mongoose = require("mongoose");
const app = express();

//congif DB
const db = require("./config/keys").mongoURI;

//connect to db
mongoose
  .connect(db)
  .then(() => console.log("Mongo Db connected"))
  .catch(err => console.log(err));

//lets write our first request
app.get("/", (req, res) => res.send("Hello "));

const port = 8020;
app.listen(port, () => console.log(`server running on the port ${port}`));
