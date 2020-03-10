const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const passport = require('passport');
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//congif DB
const db = require("./config/keys").mongoURI;

//connect to db
mongoose
  .connect(db)
  .then(() => console.log("Mongo Db connected"))
  .catch(err => console.log(err));

  //Passport middleware
app.use(passport.initialize());
//Passport config
require('./config/passport')(passport)

//lets write our first route
app.get("/", (req, res) => res.send("Hello "));
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = 8030;
app.listen(port, () => console.log(`server running on the port ${port}`));
